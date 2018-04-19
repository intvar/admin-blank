import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

const RecoveryPasswordForm = ({ handleSubmit, isLoading }) => (
  <div className="account-page">
    <Paper className="account-form" zDepth={1} >
      <form onSubmit={handleSubmit}>
        <h1 className="account-form__header">Recovery password</h1>
        <Field
          name="password"
          component={TextField}
          className="account-form__field"
          floatingLabelText="Password"
          fullWidth
          type="password"
        />
        <Field
          name="confirm_password"
          component={TextField}
          className="account-form__field"
          floatingLabelText="Confirm password"
          fullWidth
          type="password"
        />
        {
          isLoading ?
            <CircularProgress className="account-form__loader" />
          : <RaisedButton label="save" primary fullWidth type="submit" />
        }
      </form>
    </Paper>
  </div>
);

RecoveryPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default RecoveryPasswordForm;
