import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import LinearProgress from 'material-ui/LinearProgress';
import Menu from '../menu';
import Header from '../header';
import history from '../../utils';
import Notification from '../../containers/notification';
import Dialog from '../../containers/dialog';
import PrivateRoute from './private_route';
import routes from '../../routes';

const ItemRoute = ({ path, component, isPrivate }) => {
  const RouteComponent = isPrivate ? PrivateRoute : Route;
  return (<RouteComponent
    path={path}
    component={component}
  />);
};

ItemRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
  isPrivate: PropTypes.bool.isRequired,
};

const App = ({ isAuthorized, isLoading }) => (
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
            {
              routes.map(route => <ItemRoute key={route.path} {...route} />)
            }
            <Redirect to="users" />
          </Switch>
        </div>
      </div>
      <Notification />
      <Dialog />
    </div>
  </Router>
);

App.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default App;
