import { logout, authCheckoutTime, authUserSaga, authCheckStateSaga } from './auth'
import { initIngredientsSaga } from './ingredients'
import { purchaseBurgerSaga, fetchOrdersSaga } from './order'
import { takeEvery, all, takeLatest } from 'redux-saga/effects'

import * as Constants from '../Constants'

export function* watchAuth() {
    yield all([
        takeEvery(Constants.AUTH_CHECK_TIMEOUT, authCheckoutTime),    //we can use all to wrap all actions into one instead
            takeEvery(Constants.AUTH_INITIATE_LOGOUT, logout),          //of using takeEvery for each time
        takeEvery(Constants.AUTH_USER, authUserSaga),
        takeEvery(Constants.AUTH_STATE_CHECK, authCheckStateSaga)
    ])


}

export function* watchIngredients() {
    yield takeEvery(Constants.INIT_INGREDIENT_START, initIngredientsSaga)
}

export function* watchPurchase() {
    yield takeLatest(Constants.PURCHASE_BURGER_START, purchaseBurgerSaga) //always use takeLatest to get the latest 
    yield takeEvery(Constants.FETCH_ORDERS, fetchOrdersSaga)               //clicks
}