import {ADD_INGREDIENT, REMOVE_INGREDIENT, SET_INGREDIENT, FETCH_INGREDIENTS_FAILED} from '../action/actionTypes'

const initialState = {
    ingredients : null,
    totalPrice : 4,
    error : false,
    building : false
}
const INGREDIENTS_PRICE = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
};

const addIngredient = (state, action) => {
    return {
        ...state,
        ingredients : {
            ...state.ingredients,
            [action.ingredientType] : state.ingredients[action.ingredientType] + 1
        },
        totalPrice : state.totalPrice + INGREDIENTS_PRICE[action.ingredientType],
        building : true
    }
}

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients : {
            ...state.ingredients,
            [action.ingredientType] : state.ingredients[action.ingredientType] - 1
        },
        totalPrice : state.totalPrice - INGREDIENTS_PRICE[action.ingredientType],
        building : true
    }
}

const setIngredient = (state, action) => {
    return {
        ...state, 
        ingredients : {
            salad : action.ingredients.salad,
            bacon : action.ingredients.bacon,
            meat : action.ingredients.meat,
            cheese : action.ingredients.cheese
        },
        totalPrice : 4,
        error : action.error,
        building : false
    }
}

const fetchIngredientFailed = (state, action) => {
    return  {
        ...state,
        error : action.error
    }     
}
const burgerBuilderReducer = (state = initialState, action) => {
   
    
    switch(action.type) {
        case ADD_INGREDIENT : return addIngredient(state, action);
        case REMOVE_INGREDIENT : return removeIngredient(state, action);
        case SET_INGREDIENT : return setIngredient(state, action);
        case FETCH_INGREDIENTS_FAILED : return fetchIngredientFailed(state, action);
        default:return state;    
    }
}


export default burgerBuilderReducer;
