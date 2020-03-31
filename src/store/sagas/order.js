import {put} from 'redux-saga/effects';
import * as actionCreator from '../action/index';
import axios from '../../config/axios/orderAxios';

export function* purchaseBurgerSaga(action) {
    yield put(actionCreator.purchaseBurgerInitiate());
    try {
        const res = yield axios.post('/order.json?auth='+action.token, action.data);
        yield put(actionCreator.purchaseBurgerSuccess(res.data.name, action.data))
    } catch (error) { 
        yield put(actionCreator.purchaseBurgerFail())
    };
}

export function* fetchBurgerOrdersSaga(action) {
    yield put(actionCreator.fetchOrderStart())
        const queryParam = '?auth='+action.token+'&orderBy="userId"&equalTo="'+ action.userId+'"'
        try {
            const res = yield axios.get('order.json'+queryParam);
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id : key
                });
            }
            yield put(actionCreator.fetchOrderSuccess(fetchedOrders));
        } catch(err) {
            yield put(actionCreator.fetchOrderFail(err));
        }
}