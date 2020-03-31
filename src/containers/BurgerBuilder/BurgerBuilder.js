import React, {useState, useEffect} from 'react'
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../UI/Modal/Modal'
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import {connect} from 'react-redux'
import {add_ingredient, remove_ingredient, intiIngredient, purchaseInit, setAuthRedirectPath} from '../../store/action/index'
import axios from '../../config/axios/orderAxios'



export const burgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    useEffect(()=>{
        props.onInitIngredients();
    }, []);

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(key => ingredients[key])
        .reduce((sum, num)=>sum+num, 0);
        return  sum>0;
    }

    const purchaseHandler = () => {
        if(props.isAuth) {
            setPurchasing(true);
        } else {
            props.onSetAuthRedirectPath("/checkout")
            props.history.push('/auth')
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }
    const purchaseContinueHandler = () => {
        props.onPurchaseInit();
        props.history.push('/checkout');
    }
    const disableInfo = {...props.ingredients};
    for(let key in disableInfo) 
        disableInfo[key] = disableInfo[key] <= 0;
    let orderSummary = null;
    let burger = props.error ? <p>Ingredient can't be loaded</p> :<Spinner />
    if(props.ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={props.ingredients}/>
                <BuildControls 
                price={props.totalPrice}
                ingredientAdded={props.addIngredientsHandler}
                ingredientRemove={props.removeIngredientsHandler}
                purchasable={updatePurchaseState(props.ingredients)}
                purchasing={purchaseHandler}
                disableInfo={disableInfo}
                isAuth={props.isAuth}

                />
            </Aux>);

            orderSummary = <OrderSummary 
            ingredient={props.ingredients}
            cancel={purchaseCancelHandler}
            continue={purchaseContinueHandler}
            total={props.totalPrice}/>;
        }
        return(
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

const mapStateToProps = state => {
    return {
        ingredients : state.bBRed.ingredients,
        totalPrice : state.bBRed.totalPrice,
        error : state.bBRed.error,
        purchased : state.oRed.purchased,
        isAuth : state.authRed.token !== null

    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredientsHandler : (ingredientType) => dispatch(add_ingredient(ingredientType)),
        removeIngredientsHandler : (ingredientType) => dispatch(remove_ingredient(ingredientType)),
        onInitIngredients : () => dispatch(intiIngredient()),
        onPurchaseInit : () => dispatch(purchaseInit()),
        onSetAuthRedirectPath : (path) => dispatch(setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));