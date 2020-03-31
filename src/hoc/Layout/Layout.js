import React, { useState } from 'react'
import Aux from '../../hoc/Aux/Aux'
import layoutClasses from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'
const layout = props => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerClosedHandler = () => {
        setShowSideDrawer( false)
    }

    const sideDrawerToggleHandler = () => {
        setShowSideDrawer( !showSideDrawer)
    }
    return <Aux>
            <Toolbar isAuth={props.isAuth} open={sideDrawerToggleHandler}/>
            <SideDrawer isAuth={props.isAuth} open={showSideDrawer} closed={sideDrawerClosedHandler} />
            <main className={layoutClasses.Content}>{props.children}</main>
        </Aux>
}

const mapStateToProps = (state) => {
    return {
        isAuth : state.authRed.token != null
    }
}
export default connect(mapStateToProps)(layout);