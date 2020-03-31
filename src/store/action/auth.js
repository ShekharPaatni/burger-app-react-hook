import * as actionTypes from './actionTypes';

export const authSuccessful = (idToken, localId) => {
    return {
        type : actionTypes.AUTH_SUCCESSFUL,
        authData : idToken,
        userId : localId
    }
};

export const authFailure = (error) => {
    return {
        type :  actionTypes.AUTH_FAILURE,
        error : error
    }
}

export const authStarted = () => {
    return {
        type : actionTypes.AUTH_START
    }
};

export const authLogout = () => {
    return {
        type : actionTypes.TOKEN_INVALIDATE_INITIATE
    }
}

export const authLogoutSucceed = () => {
    return {
        type : actionTypes.TOKEN_INVALIDATE
    }
}

export const checkAuthToken = (expiryTimeOut) => {
    return {
        type: actionTypes.CHECK_AUTH_TOKEN,
        expirationTime: expiryTimeOut ? expiryTimeOut : 3600
    };
}

export const authInitialize = (email, password, isSignUp) => {
    return {
        type : actionTypes.AUTH_USER,
        email : email,
        password : password,
        isSignUp :isSignUp
    }
}

export const setAuthRedirectPath = (path) => {
    return  {
        type : actionTypes.SET_REDIRECT_PATH,
        path : path
    }
}

export const checkAuthState = () => {
    return {
        type : actionTypes.AUTH_AUTO_LOGIN_TRY
    }
}