import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/index'

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'




export class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {

        purchasing: false,
       
    
    }
    componentDidMount() {
       this.props.initIngredients();
    }
    /*   updatePurchaseState(ingredients) {
          const sum = Object.keys(ingredients)
              .map(igKey => {
                  return ingredients[igKey];
              })
              .reduce((sum, el) => {
                  return sum + el;
              }, 0);
          this.setState({ purchasable: sum > 0 });
      } */



    purchaseHandler = () => {
        if(this.props.userAuthenticated){
            this.setState({ purchasing: true });
        } else{
            this.props.onAuthRedirect('/checkout')
            this.props.history.push('/auth')
        }
     
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.purchaseInit();
        this.props.history.push('/checkout')

    }
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // {salad: true, meat: false, ...}
        let orderSummary = null


        let burger = this.props.error ? <p>something went wrong</p> : <Spinner />
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.addIngredients}
                        ingredientRemoved={this.props.removeIngredients}
                        disabled={disabledInfo}
                        purchasable={this.props.purchasable}
                        isAuth={this.props.userAuthenticated}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice} />
                </Aux>
            )
            orderSummary = <OrderSummary
                price={this.props.totalPrice}
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />

        }
     /*    if (this.state.loading) {
            orderSummary = <Spinner />
        } */
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ings: state.ings.ingredients,
        totalPrice: state.ings.totalPrice,
        error: state.ings.error,
        purchasable: state.ings.purchasable,
        userAuthenticated:state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredients: (ingName) => dispatch(actions.addIngredients(ingName)),
        removeIngredients: (ingName) => dispatch(actions.removeIngredients(ingName)),
        initIngredients: () => dispatch(actions.initIngredients()),
        purchaseInit: () => dispatch(actions.purchaseInit()),
        onAuthRedirect: (path) => dispatch(actions.authRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));