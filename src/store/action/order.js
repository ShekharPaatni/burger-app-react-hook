import * as actionTypes from '../action/actionTypes';


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        id : id,
        orderData : orderData,
    }
}

export const purchaseBurgerFail = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL
        }
}

export const purchaseBurgerInitiate = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerStart = (data, token) => {
    return {
        type : actionTypes.PURCHASE_BURGER_START_SAGA,
        data : data,
        token : token
    }
}

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}
export const fetchOrderSuccess = (data) => {
    return {
        type : actionTypes.FETCH_ORDER_SUCCESS,
        data : data
    }
}

export const fetchOrderFail = (error) => {
    return {
        type : actionTypes.FETCH_ORDER_FAIL,
        error : error
    }
}

export const fetchOrderStart = () => {
    return {
        type : actionTypes.FETCH_ORDERS_START
    }
}
//TODO:
export const fetchOrderInit = (token, userId) => {
    return {
        type : actionTypes.FETCH_USER_SPECIFIC_ORDER,
        token : token,
        userId : userId
    }
}