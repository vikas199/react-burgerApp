import {put, call} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import axios from 'axios'
import * as actions from '../actions/index'


export function* logout(action){
 yield call([localStorage, "removeItem"], "token")
 yield localStorage.removeItem('expirationDate')
  yield localStorage.removeItem('userId')
   yield put(actions.logoutSuccess())
}

export function* authCheckoutTime(action){
    yield delay(action.expTime * 1000);
    yield put(actions.logout())
}

export function* authUserSaga(action){
   yield put(actions.authStart());
   const loginData = {
    email:action.email,
    password:action.password,
    returnSecureToken:true
};
let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD6yrd2yyMqcSlUjg9pk_5VvIY4WTO5Ei0';
if(!action.isSignup){
    url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD6yrd2yyMqcSlUjg9pk_5VvIY4WTO5Ei0';
}
try {
const response = yield axios.post(url,loginData)
const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000)
yield localStorage.setItem('token', response.data.idToken)
yield localStorage.setItem('expirationDate', expirationDate)
yield localStorage.setItem('userId', response.data.localId)
yield put(actions.authSuccess(response.data.idToken, response.data.localId))
yield put(actions.authCheckout(response.data.expiresIn))
}
catch (error){
    yield put(actions.authFail(error.response.data.error))
}
}

export function* authCheckStateSaga(action){
    const token = yield localStorage.getItem('token')
    if(!token){
        yield put(actions.logout())
    }else{
        const expirationDate = new Date(localStorage.getItem('expirationDate'))
        if(expirationDate <= new Date()){
            yield(logout())
        }else {
            const userId=localStorage.getItem('userId')
            yield put(actions.authSuccess(token, userId))
            yield put(actions.authCheckout((expirationDate.getTime() - new Date().getTime())/ 1000 ))
        }

}
}