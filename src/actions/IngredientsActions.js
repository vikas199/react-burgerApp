import * as Constants from '../Constants'


export function addIngredients(ingName) {
    return {
        type: Constants.ADD_INGREDIENT,
        ingredientName: ingName

    }
}

export function removeIngredients(ingName) {
    return {
        type: Constants.REMOVE_INGREDIENT,
        ingredientName: ingName

    }
}

export const setIngredients = (ingredients) => {
    return {
        type: Constants.SET_INGREDIENTS,
        ingredients: ingredients
    }
}
export const fetchIngredientsFail = () => {
    return {
        type: Constants.FETCH_INGREDIENTS_FAIL
    }
}

export const initIngredients = () => {
    return {
        type: Constants.INIT_INGREDIENT_START
    }
}