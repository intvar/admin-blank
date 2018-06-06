import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BugReport from 'material-ui/svg-icons/action/bug-report';
import Person from 'material-ui/svg-icons/social/person';
import Admin from 'material-ui/svg-icons/action/supervisor-account';
import LogOut from 'material-ui/svg-icons/action/exit-to-app';
import ChangePassword from 'material-ui/svg-icons/communication/vpn-key';
import Divider from 'material-ui/Divider';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SIGN_OUT } from '../../../ducks/ui/user';
import { getLeftMenu } from '../../../ducks/ui/leftMenu';


import './style.scss';

const HeadMenu = ({ isShow, handlerLogOut }) => (
  <Paper className={classNames('menu', { 'menu--hide': !isShow })} >
    <Menu>
      <MenuItem
        primaryText="Admins"
        leftIcon={<Admin />}
        containerElement={<Link to="/admins" />}
      />
      <MenuItem
        primaryText="Users"
        leftIcon={<Person />}
        containerElement={<Link to="/users" />}
      />
      <MenuItem
        primaryText="Event-Log"
        leftIcon={<BugReport />}
        containerElement={<Link to="/event-log" />}
      />
      <Divider />
      <MenuItem
        primaryText="Change password"
        leftIcon={<ChangePassword />}
        containerElement={<Link to="/change_password" />}
      />
      <MenuItem
        primaryText="Log Out"
        leftIcon={<LogOut />}
        onClick={handlerLogOut}
      />
    </Menu>
  </Paper>
);

HeadMenu.propTypes = {
  isShow: PropTypes.bool.isRequired,
  handlerLogOut: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isShow: getLeftMenu(state),
});

const mapDispatchToProps = {
  handlerLogOut: () => ({ type: SIGN_OUT }),
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadMenu);
