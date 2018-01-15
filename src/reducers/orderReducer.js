import * as Constants from '../Constants';


const initialState = {
    orders:[],
    loading:false,
    purchased:false
}

const reducer = (state=initialState, action) => {
  switch(action.type){
      case Constants.FETCH_ORDER_INIT:
      return {
          ...state,
          loading:true
      }
      case Constants.FETCH_ORDER_SUCCESS:
      return {
          ...state,
          orders:action.orders,
          loading:false
      }
      case Constants.FETCH_ORDER_FAIL:
      return {
          ...state,
          loading: false
      }
      case Constants.PURCHASE_INIT:
      return {
               ...state,
               purchased:false
      }
      case Constants.PURCHASE_BEGIN:
      return {
          ...state,
          loading:true
      }
      case Constants.PURCHASE_BURGER_SUCCESS:
      const newOrder = {
          ...action.orderData,
          id: action.orderId
      }
      return {
           ...state,
           loading:false,
           purchased:true,
           orders: state.orders.concat(newOrder)
      }
    
    case Constants.PURCHASE_BURGER_FAIL:
       return {
           ...state,
           loading: false
       }
       default: return state;

  }
}


export default reducer