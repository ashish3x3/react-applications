import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import 'react-select';

import 'react-select/dist/react-select.css';
// require('react-select/dist/react-select.css')

import Archives from "./pages/Archives";
import Featured from "./pages/Featured";
import Layout   from "./pages/Layout";
import Settings from "./pages/Settings";
import Accounts from "./pages/Accounts";
import FetchApplication from "./pages/FetchApplications";
 
// testing built
const app = document.getElementById('app'); 

ReactDOM.render(   
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Featured}></IndexRoute>
      <Route path="archives(/:article)" name="archives" component={Archives}></Route>
      <Route path="settings" name="settings" component={Settings}></Route>
      <Route path="accounts" name="accounts" component={Accounts}></Route>
      <Route path="fetchapplication" name="accounts" component={FetchApplication}></Route>
    </Route>
  </Router>,
app);
 