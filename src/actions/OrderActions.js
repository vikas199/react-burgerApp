import * as Constants from '../Constants'
import axios from '../axiosOrders'

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
    return dispatch => {
        dispatch(purchaseBegin())
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
           dispatch(purchaseSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(purchaseFail(error))
        })
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
    return dispatch => {
        dispatch(fetchOrderInit())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"' ;
        axios.get('/orders.json' + queryParams)
        .then(response => {
          //to convert an object data into array use this methodolgy
          const fetchedOrders = [];
          for(let key in response.data) {
              fetchedOrders.push({
                 ...response.data[key],
                 id:key
              });
          }
          dispatch(fetchOrderSuccess(fetchedOrders))
         
   })
   .catch(error => {
       dispatch(fetchOrderFail(error))
   })
    }
}