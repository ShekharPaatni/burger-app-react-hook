import React from 'react';
import Aux from '../../hoc/Aux/Aux'
import classes from './Spinner.css'
const spinner = () => (
    <Aux>
    <div className={classes.Loader}>Loading...</div>
    </Aux>
);


export default spinner;
