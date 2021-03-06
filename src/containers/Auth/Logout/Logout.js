import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {authLogout} from '../../../store/action/index'

const logout =props => {
    
    useEffect(() => {
        props.onLogout();
    }, [])

        return (<Redirect to="/" />) 
}


const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(authLogout())
    }
}
export default connect(null, mapDispatchToProps)(logout);