import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router-dom';

import BugReport from 'material-ui/svg-icons/action/bug-report';
import Person from 'material-ui/svg-icons/social/person';
import Admin from 'material-ui/svg-icons/action/supervisor-account';

import './style.scss';

function headMenu() {
  return (
    <Paper className="menu">
      <Menu className="menu__self">
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
      </Menu>
    </Paper>
  );
}

export default headMenu;
