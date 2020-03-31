import * as actionTypes from '../action/actionTypes';
import {updateObject} from '../../shared/Utility/utility'
const initialState = {
    token : null,
    userId : null,
    error : null,
    loading : false,
    authRedirectUri : '/'
}

const authStart = (state) => {
    return updateObject(state, {loading : true});
}

const authSuccessful = (state, idToken, userId) => {
    return updateObject(state, {
        token : idToken,
        loading : false,
        error   : null,
        userId : userId
    });
}

const authFailure =(state, error) => {
    return updateObject (state, {
        token : null,
        loading : false,
        userId : null,
        error : error
    })
}

const authTokenInvalidate = (state) => {
    return updateObject(state, {
        token : null,
        loading : false,
        userId : null,
        error   : null
    });
}

const setAuthRedirectPath = (state, path) => {
    return updateObject(state, {authRedirectUri : path})
}


const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START : return authStart(state);
        case actionTypes.AUTH_SUCCESSFUL : return authSuccessful(state, action.authData, action.userId); 
        case actionTypes.AUTH_FAILURE : return authFailure(state, action.error);
        case actionTypes.TOKEN_INVALIDATE : return authTokenInvalidate(state);
        case actionTypes.SET_REDIRECT_PATH : return setAuthRedirectPath(state, action.path);
        default:return state;            
    }
}

export default authReducer;