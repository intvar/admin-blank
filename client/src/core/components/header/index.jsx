import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { TOGGLE } from '../../../store/ducks/ui/leftMenu';
import routes from '../../routes';
import './style.scss';

const Header = ({ onLeftIconButtonClick }) => (
  <div>
    <AppBar
      title={
        <div>{routes.map(route => (
          <Route key={route.path} path={route.path} component={route.title} />
        ))}
        </div>
      }
      onLeftIconButtonClick={onLeftIconButtonClick}
    />
  </div>
);

Header.propTypes = {
  onLeftIconButtonClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onLeftIconButtonClick: () => ({ type: TOGGLE }),
};

export default withRouter(connect(null, mapDispatchToProps)(Header));
