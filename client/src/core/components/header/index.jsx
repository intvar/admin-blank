import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import './style.scss';
import logo from './images/logo.png';
import { PRIMARY_COLOR } from '../../constants';

const MenuItemStyles = {
  height: '100%',
};

const MenuItem = props => (
  <FlatButton
    label={props.label}
    hoverColor={PRIMARY_COLOR}
    button-style={MenuItemStyles}
  />
);

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
};

class Header extends Component {
  render(){
    return(
      <div className="header">
        <img
          className="header__logo"
          src={logo}
          alt="tokeny - taken crowdale solutions"
        />
        <FlatButton label="Log Out" onClick={this.props.onSignOutClick} />
      </div>
    )
  }
} 


Header.propTypes = {
  onSignOutClick: PropTypes.func.isRequired,
}

export default Header;
