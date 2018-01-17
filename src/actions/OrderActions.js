import * as Constants from '../Constants'


export const purchaseSuccess = (id, orderData) => {
    return {
        type: Constants.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData: orderData
    }
}

export const purchaseFail = (error) => {
    return {
        type: Constants.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBegin = () => {
    return {
        type: Constants.PURCHASE_BEGIN
    }
}
export const purchaseInit = () => {
    return {
        type: Constants.PURCHASE_INIT
    }
}

export const purchaseBurgerStart = (orderData, token) => {
    return {
        type: Constants.PURCHASE_BURGER_START,
        orderData:orderData,
        token:token
    }
}

export const fetchOrderSuccess = (orders) => {
    return{
        type: Constants.FETCH_ORDER_SUCCESS,
        orders:orders
    }
}

export const fetchOrderInit = () => {
    return {
        type: Constants.FETCH_ORDER_INIT
    }
}

export const fetchOrderFail = (error) => {
    return {
        type: Constants.FETCH_ORDER_FAIL,
        error:error
    }
}

export const fetchOrders = (token, userId) => {
    return {
        type: Constants.FETCH_ORDERS,
        token:token,
        userId:userId
    }
}