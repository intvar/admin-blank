import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import LinearProgress from 'material-ui/LinearProgress';
import Menu from '../menu';
import Header from '../header/index';
import EventLog from '../../../event_logs/containers/event_log';
import { Users, UserEditor } from '../../../user/';
import history from '../../utils';
import Notification from '../../containers/notification';
import Dialog from '../../containers/dialog';
import PrivateRoute from './private_route';
import SignIn from './../../../user/components/sign_in_form';
import RecoveryPassword from './../../../user/components/recover_password_form';
import SetPassword from './../../../user/components/set_password_form';

export default class App extends React.Component {
  componentDidMount() {
    console.log(`%c App started in "${NODE_ENV}" mode.`, 'color: rgb(96, 43, 252);');
  }

  render() {
    const { isAuthorized, isLoading, userPermission } = this.props;

    return (
      <Router history={history}>
        <div>
          <div className="content__loader-wrapper">
            { isLoading && <LinearProgress mode="indeterminate" /> }
          </div>
          {isAuthorized && <Header onSignOutClick={this.props.onSignOutClick} /> }
          <div className="content__wrapper">
            {isAuthorized &&
              <Menu
                onSignOutClick={this.props.onSignOutClick}
                userPermission={userPermission}
              /> }
            <div className="content__content-wrap">
              <Switch>
                <Route path="/signin" component={SignIn} />
                <Route path="/recover_password" component={RecoveryPassword} />
                <Route path="/set_password/:verify_pass_code" component={SetPassword} />
                <PrivateRoute path="/event-log/" component={EventLog} />
                <PrivateRoute path="/users/:action/:id" component={UserEditor} />
                <PrivateRoute path="/users/:action/" component={UserEditor} />
                <PrivateRoute path="/users" component={Users} />
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

App.defaultProps = {
  userPermission: null,
};

App.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSignOutClick: PropTypes.func.isRequired,
  userPermission: PropTypes.shape({
    operator: PropTypes.bool.isRequired,
    security_admin: PropTypes.bool.isRequired,
  }),
};
