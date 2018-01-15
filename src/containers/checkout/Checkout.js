import React, { Component } from 'react';
import CheckoutSummary from '../../components/Orders/CheckoutSummary/CheckoutSummary'
//import * as actions from '../../actions/index'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import ContactData from '../ContactData/ContactData'

class Checkout extends Component {

    cancelOrder = () => {
        this.props.history.goBack();
    }
    purchaseOrder = () => {
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary =
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ings}
                        cancelOrder={this.cancelOrder}
                        purchaseOrder={this.purchaseOrder} />
                    <Route path={this.props.match.path + '/contact-data'}
                        component={ContactData} />
                </div>
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ings.ingredients,
        purchased: state.orders.purchased
        //totalPrice: state.ings.totalPrice
    }
}


export default connect(mapStateToProps, null)(Checkout);