import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { TOGGLE } from '../../../store/ducks/ui/leftMenu';
import './style.scss';


const Header = ({ onLeftIconButtonClick }) => (
  <AppBar
    title="Title"
    onLeftIconButtonClick={onLeftIconButtonClick}
  />
);


Header.propTypes = {
  onLeftIconButtonClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onLeftIconButtonClick: () => ({ type: TOGGLE }),
};

export default connect(null, mapDispatchToProps)(Header);
