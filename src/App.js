import React, { useEffect, Fragment } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch, withRouter} from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import {checkAuthState} from './store/action/index';

// const asyncCheckout = React.lazy(() => {return import('./containers/Checkout/Checkout')});
const app = (props) =>  {
  useEffect(() => {
    props.onTryAutoSign();
  }, []);

    return (
      <Fragment>
        <Layout>
          <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/checkout'  component={Checkout} />
            <Route path='/orders' component={Orders}/>
            <Route path="/logout" component={Logout} />
            <Route path="/"  component={BurgerBuilder} />
          </Switch>
        </Layout>
      </Fragment>
    );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSign  : () => dispatch(checkAuthState())
   }
}
export default withRouter(connect(null, mapDispatchToProps)(app));
