import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger'
import Button from '../../../UI/Button/Button'

const checkoutSummary = (props) => {
    return(
        <Aux>
            <div className={classes.CheckoutSummary}>
                <h1>We hope it taste well!</h1>
                <div style={{width: '100%', height: '300px', margin: 'auto'}}>
                    <Burger ingredients={props.ingredients} />
                </div>
                <Button 
                btnType="Danger"
                clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button 
                btnType="Success"
                clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </Aux>
    );
}

export default checkoutSummary;