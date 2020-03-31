import React from 'react'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import burgerClasses from './Burger.css'
import { withRouter} from 'react-router-dom'

const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return  [...Array(props.ingredients[igKey])].map(
                (_, i) => <BurgerIngredients keys={igKey+i} type={igKey} />
            );
        }).reduce((prev, newVal) => {
            return prev.concat(newVal)
        },[]);

    if (transformedIngredients.length === 0) {
            transformedIngredients = <p>Please start adding an ingredients</p>
    }
    return <div className={burgerClasses.Burger}>
            <BurgerIngredients keys="bread-top0" type="bread-top"/>
                {transformedIngredients}
            <BurgerIngredients keys="bread-top1" type="bread-bottom"/>

        </div>}

export default withRouter(burger);