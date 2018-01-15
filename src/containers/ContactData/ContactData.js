import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button/Button'
import classes from './ContactData.css'
import * as actions from '../../actions/index'
//import axios from '../../axiosOrders';
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'street '
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'zip code '
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                touched: false,
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'enter country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'enter email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },

            delivaryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' },
                    ]
                },
                valid: true,
                validation: {},
                value: 'fastest'
            }
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        //console.log(this.props.ingredients);
        const formData = {};
        for (let formIdentifier in this.state.orderForm) {
            formData[formIdentifier] = this.state.orderForm[formIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData,
            userId:this.props.userId

        }
        this.props.purchaseBurgerStart(order, this.props.token)
     
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    changedInputHandler = (event, inputIdentifier) => {
        console.log(event.target.value)
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedOrderFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedOrderFormElement.value = event.target.value;
        updatedOrderFormElement.valid = this.checkValidity(updatedOrderFormElement.value, updatedOrderFormElement.validation);
        updatedOrderFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedOrderFormElement;
        console.log(updatedOrderFormElement)

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        console.log(formIsValid)
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

 

    render() {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event => this.changedInputHandler(event, formElement.id))} />
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER NOW</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your contact data</h4>
                {form}
            </div>

        )
    }
}
const mapStateToProps = state => {
    return{
        ings:state.ings.ingredients,
        totalPrice:state.ings.totalPrice,
        loading: state.orders.loading,
        token:state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        purchaseBurgerStart: (orderData,token) => dispatch(actions.purchaseBurgerStart(orderData,token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);