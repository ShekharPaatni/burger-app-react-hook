import * as actionTypes from '../action/actionTypes';
import {updateObject} from '../../shared/Utility/utility'
const initialState = {
    orders: [],
    loading : false,
    purchased : false
}

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased : false});
}

const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.PURCHASE_INIT : return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS : return updateObject(state, {
            orders : state.orders.concat({id : action.id, ...action.orderData}),
            loading : false,
            purchased : true
        });
        case actionTypes.PURCHASE_BURGER_FAIL : return updateObject(state, { 
            loading : false
        })

        case actionTypes.PURCHASE_BURGER_START : 
        return updateObject(state, {loading : true});
        
        case actionTypes.FETCH_ORDERS_START : return updateObject(state, {loading : true});
        case actionTypes.FETCH_ORDER_SUCCESS : return updateObject(state, {
            loading : false,
            orders : action.data
        });
        case actionTypes.FETCH_ORDER_FAIL : return updateObject(state, {
            loading : false
        });
        default : return state;
    }
}

export default orderReducer;