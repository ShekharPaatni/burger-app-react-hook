import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummay/CheckoutSummary'
import {Route, Redirect} from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'
const checkout = props => {
    
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }

    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }
    let summary = <Redirect to='/' />
    if(props.ingredients) {
        const purchasedSuccessful = props.purchased ?
            <Redirect to="/" /> : null;
        summary = (<div>
            {purchasedSuccessful}
            <CheckoutSummary
            ingredients={props.ingredients}
            checkoutContinued={checkoutContinuedHandler}
            checkoutCancelled={checkoutCancelledHandler}
            />
            <Route 
            path={props.match.url+"/contact-data"} 
            component={ContactData}/>
    </div>);
        }
        return summary;
}

const mapStateToProps = state => {
    return {
        ingredients : state.bBRed.ingredients,
        purchased : state.oRed.purchased
    }
}
export default connect(mapStateToProps)(checkout);