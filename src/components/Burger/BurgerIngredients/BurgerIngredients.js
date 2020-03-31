import React from 'react'
import PropTypes from 'prop-types'
import ingredientsClasses from './BurgerIngredients.css'
const ingredients = (props) => {
    let ingredients = null;
    switch(props.type) {
        case ('bread-bottom') : 
            ingredients = <div className={ingredientsClasses.BreadBottom} ></div>;
            break;
        case ('bread-top') :
            ingredients = <div className={ingredientsClasses.BreadTop}>
                <div className={ingredientsClasses.Seeds1}></div>
                <div  className={ingredientsClasses.Seeds2}></div>
            </div>; 
            break;
        case ('meat') :
            ingredients = <div className={ingredientsClasses.Meat}></div>;
            break;
        case ('cheese') :
            ingredients = <div className={ingredientsClasses.Cheese}></div>;
            break;    
        case ('salad') :
            ingredients = <div className={ingredientsClasses.Salad}></div>;
            break;
        case ('bacon') :
            ingredients = <div className={ingredientsClasses.Bacon}></div>;
            break;
        default:
            break;    

    }

    return ingredients;
}

ingredients.protoTypes = {
    type : PropTypes.string.isRequired
};

export default ingredients;