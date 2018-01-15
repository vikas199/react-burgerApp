import * as Constants from '../Constants'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath:"/"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Constants.AUTH_REDIRECT_PATH:
        return{
            ...state,
            authRedirectPath: action.path
        }
        case Constants.AUTH_LOGOUT:
            return{
                ...state,
                token:null,
                userId:null
            }
        
        case Constants.AUTH_START:
            return {
                ...state,
                loading: true,
                error: null
            }
        case Constants.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                userId: action.userId,
                loading: false
            }
        case Constants.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading:false
            }
        default: return state;
    }
}

export default reducer;