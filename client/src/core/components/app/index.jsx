import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import LinearProgress from 'material-ui/LinearProgress';
import Menu from '../menu';
import Header from '../header';
import EventLog from '../../../event_logs/containers/event_log';
import { Users, UserEditor } from '../../../user/';
import { Admins, AdminEditor } from '../../../admins';
import history from '../../utils';
import Notification from '../../containers/notification';
import Dialog from '../../containers/dialog';
import PrivateRoute from './private_route';
import SignIn from '../../../auth/sign_in_form';
import ForgotPassword from '../../../auth/forgot_password_form';
import RecoveryPasswordForm from '../../../auth/recovery_password_form';

export default class App extends React.Component {
  componentDidMount() {
    console.log(`%c App started in "${NODE_ENV}" mode.`, 'color: rgb(96, 43, 252);');
  }

  render() {
    const { isAuthorized, isLoading } = this.props;

    return (
      <Router history={history}>
        <div>
          <div className="content__loader-wrapper">
            { isLoading && <LinearProgress mode="indeterminate" /> }
          </div>
          {isAuthorized && <Header /> }
          <div className="content__wrapper">
            {isAuthorized && <Menu /> }
            <div className="content__content-wrap">
              <Switch>
                <Route path="/signin" component={SignIn} />
                <Route path="/forgot_password" component={ForgotPassword} />
                <Route path="/recovery_password/:verify_pass_code" component={RecoveryPasswordForm} />
                <PrivateRoute path="/event-log/" component={EventLog} />
                <PrivateRoute path="/users/:id" component={UserEditor} />
                <PrivateRoute path="/users" component={Users} />
                <PrivateRoute path="/admins/add" component={AdminEditor} />
                <PrivateRoute path="/admins/:id" component={AdminEditor} />
                <PrivateRoute path="/admins" component={Admins} />
                <Redirect to="users" />
              </Switch>
            </div>
          </div>
          <Notification />
          <Dialog />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
