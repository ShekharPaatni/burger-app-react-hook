import {takeEvery, takeLatest, all} from 'redux-saga/effects';

import * as actionTypes from '../action/actionTypes';
import * as authSaga from './auth'
import * as burgerBuilderSaga from './BurgerBuilder'
import * as orderSage from './order'

export function* watchAuth() {
    yield all([
        takeEvery(actionTypes.TOKEN_INVALIDATE_INITIATE, authSaga.logoutSaga),
        takeEvery(actionTypes.CHECK_AUTH_TOKEN, authSaga.checkTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authSaga.authUserSaga),
        takeEvery(actionTypes.AUTH_AUTO_LOGIN_TRY, authSaga.authCheckStateSaga),
        takeEvery(actionTypes.FETCH_INGREDIENTS, burgerBuilderSaga.fetchIngredientsSaga),
        takeLatest(actionTypes.PURCHASE_BURGER_START_SAGA, orderSage.purchaseBurgerSaga),
        takeEvery(actionTypes.FETCH_USER_SPECIFIC_ORDER, orderSage.fetchBurgerOrdersSaga)
    ]);
}