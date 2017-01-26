import { createStore, compose, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { routerMiddleware, push } from 'react-router-redux'


import { Router, browserHistory } from 'react-router';


export default function configureStore(initialState) {

  const router = routerMiddleware(browserHistory);
  const store = createStore(
    rootReducer,
    initialState,
    compose (
      applyMiddleware(thunk,router),  //ReduxPromise
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
    //window.devToolsExtension ? window.devToolsExtension() : undefined   //undefined if using Redux DevTools extension / Chrome, 
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}