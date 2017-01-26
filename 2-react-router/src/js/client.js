import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory, browserHistory  } from "react-router";
import 'react-select';

import 'react-select/dist/react-select.css';
// require('react-select/dist/react-select.css')

import Archives from "./pages/Archives";
import Featured from "./pages/Featured";
import Layout   from "./pages/Layout";
import Settings from "./pages/Settings";
import Accounts from "./pages/Accounts";
import FetchApplication from "./pages/FetchApplications";
import Fieldset from "./pages/Fieldset";
import Login from "./components/Login"
import Register from "./components/Register"
import Esign from "./components/Esign"  
import Yodlee from "./components/Yodlee"
import Home from './containers/Home';


import { Provider } from 'react-redux';
import configureStore from './store/configureStore';


const store = configureStore();


 
// testing built
const app = document.getElementById('app'); 

ReactDOM.render(   
  <Provider store={store}>

      <Router history={browserHistory}>
        <Route path="/" component={Home}>
          <IndexRoute component={Layout}></IndexRoute>
          <Route path="archives(/:article)" name="archives" component={Archives}></Route>
          <Route path="settings" name="settings" component={Settings}></Route>
          <Route path="accounts" name="accounts" component={Accounts}></Route>
          <Route path="fetchapplication" name="fetchapplication" component={FetchApplication}></Route>
          <Route path="fieldset(/:objectName/:filedsetName(/:recordId))" name="fieldset" component={Fieldset}></Route>
          <Route path="login" name="login" component={Login}></Route>
          <Route path="register" name="Register" component={Register}></Route>
          <Route path="esign" name="esign" component={Esign}></Route>
          <Route path="yodlee" name="yodlee" component={Yodlee}></Route>
        </Route>
      </Router>

  </Provider>,

app);
 