import * as Constants from '../Constants'
import axios from '../axiosOrders'

export function addIngredients(ingName) {
    return {
        type: Constants.ADD_INGREDIENT,
        ingredientName:ingName

    }
}

export function removeIngredients(ingName) {
    return {
        type: Constants.REMOVE_INGREDIENT,
        ingredientName:ingName

    }
}

export const setIngredients = (ingredients) => {
    return{
        type: Constants.SET_INGREDIENTS,
        ingredients:ingredients
    }
}
export const fetchIngredientsFail = () => {
    return {
        type: Constants.FETCH_INGREDIENTS_FAIL
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-fa843.firebaseio.com/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data))
        })
        .catch(error => {
            dispatch(fetchIngredientsFail());
        })
    }

    
}