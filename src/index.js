/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

 * Product Page: https://spexdoc.net
 * Copyright 2020 SpexDoc (https://spexdoc.net)
 * Licensed under MIT (https://github.com/hashtag32/spexdocapp/blob/master/LICENSE.md)

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";

import { Provider } from "react-redux";
import { store } from "components/Internal/Redux.js";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(
  // Enabling the store for the whole App
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/" component={Admin} />
        <Route path="/rtl" component={RTL} />
        <Redirect from="/" to="/dashboard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
