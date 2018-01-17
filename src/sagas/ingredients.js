import axios from 'axios'
import { put } from 'redux-saga/effects'
import * as actions from '../actions/index'

export function* initIngredientsSaga(action) {
    try {
        const response = yield axios.get('https://burger-fa843.firebaseio.com/ingredients.json')
        yield put(actions.setIngredients(response.data))
    }
    catch (error) {
        yield put(actions.fetchIngredientsFail())
    }

}