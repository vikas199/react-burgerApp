import * as Constants from '../Constants'
//import axios from 'axios'

export const authStart = () => {
    return{
        type:Constants.AUTH_START
    }
}

export const authSuccess = (id, uId) => {
    return {
        type:Constants.AUTH_SUCCESS,
        idToken:id,
        userId:uId
    }
}


export const authFail = (error) => {
    return {
        type:Constants.AUTH_FAIL,
        error:error
    }
}

export const logout = () => {
    //localStorage.removeItem('token')
    //localStorage.removeItem('expirationDate')
    //localStorage.removeItem('userId')
    return{
        type:Constants.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSuccess = () => {
    return{
        type:Constants.AUTH_LOGOUT
    }
}

export const authCheckout = (expTime) => {
   return {
       type:Constants.AUTH_CHECK_TIMEOUT,
       expTime:1000
   }
}

export const authUser = (email, password, isSignup) => {
    return {
        type: Constants.AUTH_USER,
        email:email,
        password:password,
        isSignup:isSignup
    }
}

export const authRedirectPath = (path) => {
    return{
        type:Constants.AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = () => {
    return {
        type:Constants.AUTH_STATE_CHECK
    }
}