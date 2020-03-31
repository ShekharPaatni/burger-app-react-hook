import React, { useState, useEffect } from 'react';

import Modal from '../../UI/Modal/Modal'
import Aux from '../Aux/Aux'
import useHttpErrorHandler from '../../hooks/httpHandlerHook'

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
     const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);   

        return (
            <Aux >
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        )
        }
}

export default withErrorHandler;