import {combineReducers} from 'redux'
import ingredientsReducer from './ingredientReducer'
import orderReducer from './orderReducer'
import authReducer from './authReducer'

 const  rootReducer=combineReducers({
    ings:ingredientsReducer,
    orders:orderReducer,
    auth:authReducer
});

export default rootReducer

