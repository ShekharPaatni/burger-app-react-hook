import * as actionTypes from './actionTypes';

export const add_ingredient = (ingredientType) => {
   return {
       type : actionTypes.ADD_INGREDIENT,
        ingredientType : ingredientType
    }
}

export const remove_ingredient = (ingredientType) => {
    return {
        type : actionTypes.REMOVE_INGREDIENT, 
        ingredientType: ingredientType
    }
}

export const fetchIngredientFailed = (error) => {
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED,
        error : error
    }
}

export const setIngredient = (ingredients, error) => {
    return {
        type : actionTypes.SET_INGREDIENT,
        ingredients : ingredients,
        error : error
    }
}

export const intiIngredient = () => {
    return {
        type : actionTypes.FETCH_INGREDIENTS
    }
}