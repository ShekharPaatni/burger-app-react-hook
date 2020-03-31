import {put} from 'redux-saga/effects';
import * as actionCreator from '../action/index';
import axios from '../../config/axios/orderAxios'

export function* fetchIngredientsSaga(action) {
    try {
        const res = yield axios.get("/ingredients.json");
        yield put(actionCreator.setIngredient(res.data, false))
    }catch (err) {
        yield put(actionCreator.fetchIngredientFailed(true))
    }
} 