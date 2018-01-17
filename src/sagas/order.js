import {put} from 'redux-saga/effects'
import axios from 'axios'
import * as actions from '../actions/index'

export function* purchaseBurgerSaga(action){
    try {
        yield put(actions.purchaseBegin())
        const response =   yield axios.post('https://burger-fa843.firebaseio.com/orders.json?auth=' + action.token, action.orderData)
        yield put(actions.purchaseSuccess(response.data.name, action.orderData))
    }
    catch(error){
       yield put(actions.purchaseFail(error))
    }

}

export function* fetchOrdersSaga(action){
    try {
        yield put(actions.fetchOrderInit())
        const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"' ;
        const response= yield axios.get('https://burger-fa843.firebaseio.com/orders.json' + queryParams)
        const fetchedOrders = [];
        for(let key in response.data) {
            fetchedOrders.push({
               ...response.data[key],
               id:key
            });
        }
        yield put(actions.fetchOrderSuccess(fetchedOrders))
    }
    catch(error){
        yield put(actions.fetchOrderFail(error))
    }
  
}