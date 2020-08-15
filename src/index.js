import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { isAuthenticated } from './services/auth';
import AuthLayout from './layouts/Auth';
import AdminLayout from './layouts/Admin';

import './assets/scss/material-dashboard-pro-react.scss';

const hist = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Route path="/auth" component={AuthLayout} />
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Redirect from="/" to="/auth/login-page" />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </MuiPickersUtilsProvider>
    </Switch>
  </Router>,
  document.getElementById('root'),
);
