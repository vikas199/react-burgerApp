import React, { Component } from 'react';
import axios from '../../axiosOrders'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../actions/index'
import { connect } from 'react-redux';
import Order from '../../components/Orders/Order/Order'
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler'

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
    }
    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price} />
            })

        }
        return (
            <div>
                {orders}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.orders.orders,
        loading: state.orders.loading,
        token: state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(actions.fetchOrders(token,userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));