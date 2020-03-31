import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import {BrowserRouter} from 'react-router-dom'
import createSagaMiddleWare from 'redux-saga'
import burgerBuilderReducer from './store/reducer/BurgerBuilderReducer'
import orderReducer from './store/reducer/order'
import authReducer from './store/reducer/auth'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import { watchAuth } from './store/sagas/index'

const logger = store => next => action => {
  console.log("Middleware triggered:", action);
  next(action);
}

const rootReducer = combineReducers({
  bBRed : burgerBuilderReducer,
  oRed : orderReducer,
  authRed : authReducer
});

const sagaMiddleWare = createSagaMiddleWare();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer, composeEnhancers(
//    applyMiddleware(logger, thunk, sagaMiddleWare)
//   ));

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger, sagaMiddleWare)))


sagaMiddleWare.run(watchAuth)

const app = (
              <Provider store={store}>
                <BrowserRouter> 
                  <App /> 
                </BrowserRouter>
              </Provider>
            );

ReactDOM.render(app, document.getElementById('root'));
