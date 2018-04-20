import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Paper from 'material-ui/Paper';
import { SelectField, TextField } from 'redux-form-material-ui';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { USER_STATUSES } from '../../../../constants';
import './style.scss';

const UsersFilters = ({ reset }) => (
  <Paper className="users-filter">
    <form>
      <div className="users-filter__block">
        <Field
          name="status"
          component={SelectField}
          floatingLabelText="status"
        >
          {
            Object.keys(USER_STATUSES).map(statusId => (
              <MenuItem
                primaryText={USER_STATUSES[statusId]}
                value={+statusId}
                key={statusId}
              />))
          }
        </Field>
        <Field
          name="search_criterion"
          component={TextField}
          floatingLabelText="search"
          className="users-filter__search_criterion"
        />
      </div>
      <RaisedButton
        className="users-filter__reset"
        label="Reset"
        secondary
        onClick={reset}
      />
    </form>
  </Paper>
);

UsersFilters.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default UsersFilters;
