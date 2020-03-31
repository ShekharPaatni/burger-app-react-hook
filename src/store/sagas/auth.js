import {put, call, delay} from 'redux-saga/effects';
import * as actionCreator from '../action/index';
import axios from 'axios'

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], "token");
    yield call([localStorage, 'removeItem'], "expirationDate");
    yield call([localStorage, 'removeItem'], "userId");
    yield put(actionCreator.authLogoutSucceed());
}

export function* checkTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actionCreator.authLogout());
}

export function* authUserSaga(action) {
    yield put(actionCreator.authStarted());
     const authData = {
        email : action.email,
        password : action.password
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp'
    if(!action.isSignUp)
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword'

    try {
        const res = yield axios.post(url+'?key=[key]', authData)
        const expirationDate = yield new Date(new Date().getTime() + (res.data.expiresIn *1000));
        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('userId', res.data.localId)
        yield put(actionCreator.authSuccessful(res.data.idToken, res.data.localId))
        yield put(actionCreator.checkAuthToken(res.data.expiresIn))
    } catch(error) {
        yield put(actionCreator.authFailure(error.response.data.error))
    }
}

export function* authCheckStateSaga (action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actionCreator.authLogout());
    } else {
        const expirationDate = yield localStorage.getItem('expirationDate');
        const userId = yield localStorage.getItem('userId')
        if(expirationDate < new Date()){
            yield put(actionCreator.authLogout());
        } else {
            yield put(actionCreator.authSuccessful(token, userId));
            yield put(actionCreator.checkAuthToken((new Date(expirationDate).getTime() -  new Date().getTime()) /1000));
        }
    }
}
