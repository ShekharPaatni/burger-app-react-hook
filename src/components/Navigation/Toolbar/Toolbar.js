import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const toolbar = (props) =>
 <header className={classes.Toolbar}>
     <DrawerToggle open={props.open} />
    <div className={classes.Logo}>
        <Logo/>
    </div>
    <nav className={classes.DeskopOnly}><NavigationItems isAuth={props.isAuth}/></nav>
</header>;

export default toolbar;