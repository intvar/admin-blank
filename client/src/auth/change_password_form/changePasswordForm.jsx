import React from 'react';
import { Field } from 'redux-form';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { TextField } from 'redux-form-material-ui';
import PropTypes from 'prop-types';

const ChangePasswordForm = ({ handleSubmit }) => (
  <Paper className="account-form" zDepth={1}>
    <form onSubmit={handleSubmit}>
      <Field
        name="old_password"
        component={TextField}
        floatingLabelText="Old password"
        className="account-form__field"
        fullWidth
        type="password"
      />
      <Field
        name="new_password"
        component={TextField}
        floatingLabelText="New password"
        className="account-form__field"
        fullWidth
        type="password"
      />
      <Field
        name="confirm_password"
        component={TextField}
        floatingLabelText="Confirm password"
        className="account-form__field"
        fullWidth
        type="password"
      />
      <RaisedButton primary type="submit" label="Save" fullWidth />
    </form>
  </Paper>
);

ChangePasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default ChangePasswordForm;
