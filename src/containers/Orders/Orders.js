import React, {useEffect} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Order from '../../components/Order/Order';
import axios from '../../config/axios/orderAxios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../UI/Spinner/Spinner'
import {connect} from 'react-redux'
import { fetchOrderInit } from '../../store/action/index'
const orders = props => {

    useEffect(()=> {
        props.fetchOrders(props.token, props.userId);
    }, []);
    let orders = <Spinner />
    if(!props.loading) {
        orders = props.orders.map((order => <Order
                key={order.id} 
                price={order.price}
                ingredients={order.ingredient}
                />))
    }
    return(
        <Aux>
            {orders}
        </Aux> 
    )
}

const mapStateToProps = state => {
    return {
        orders : state.oRed.orders,
        loading : state.oRed.loading,
        token : state.authRed.token,
        userId : state.authRed.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders : (token, userId) => dispatch(fetchOrderInit(token, userId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));