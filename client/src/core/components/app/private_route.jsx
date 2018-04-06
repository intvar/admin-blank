/* eslint react/forbid-prop-types:0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location },
        }}
        />
      )
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.data.user.get('isAuthorized'),
});

export default connect(mapStateToProps)(PrivateRoute);

