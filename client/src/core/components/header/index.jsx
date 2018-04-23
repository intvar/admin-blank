import React from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { connect } from 'react-redux';
import { TOGGLE } from '../../../store/ducks/ui/leftMenu';
import './style.scss';

const Header = ({ title, onLeftIconButtonClick }) => (
  <AppBar
    title={title}
    onLeftIconButtonClick={onLeftIconButtonClick}
  />
);

Header.propTypes = {
  title: PropTypes.string,
  onLeftIconButtonClick: PropTypes.func.isRequired,
};

Header.defaultProps = {
  title: null,
};

const mapStateToProps = state => ({ title: state.ui.title });

const mapDispatchToProps = {
  onLeftIconButtonClick: () => ({ type: TOGGLE }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
