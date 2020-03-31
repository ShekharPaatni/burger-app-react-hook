import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import logoImage from '../../assets/images/logo.png'
import classes from './Logo.css'
const logo = (props) => <Aux>
    <div className={classes.Logo}>
        <img src={logoImage} alt="Burger App"/>
    </div>
</Aux>

export default logo;