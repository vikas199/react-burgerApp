import * as Constants from '../Constants'
import axios from 'axios'

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
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return{
        type:Constants.AUTH_LOGOUT
    }
}

export const authCheckout = (expTime) => {
    return dispatch => {
         setTimeout(() => {
           dispatch(logout())
         }, expTime * 1000)
    }
}

export const authUser = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const loginData = {
            email:email,
            password:password,
            returnSecureToken:true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyD6yrd2yyMqcSlUjg9pk_5VvIY4WTO5Ei0';
        if(!isSignup){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyD6yrd2yyMqcSlUjg9pk_5VvIY4WTO5Ei0';
        }
        axios.post(url,loginData)
        .then(response => {
            console.log(response)
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('expirationDate', expirationDate)
            localStorage.setItem('userId', response.data.localId)
            dispatch(authSuccess(response.data.idToken, response.data.localId))
            dispatch(authCheckout(response.data.expiresIn))
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error))
        })
    }
}

export const authRedirectPath = (path) => {
    return{
        type:Constants.AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState = () => {
    return dispatch =>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout())
            } else {
                const userId=localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(authCheckout((expirationDate.getTime() - new Date().getTime())/ 1000 ))
            }
           
        }
    }
}