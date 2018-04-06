import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import RaisedButton from 'material-ui/RaisedButton';
import { onLinkClick } from '../../../core/utils';

const RecoverPasswordForm = ({ handleSubmit, isLoading }) => (
  <div className="account-page">
    <Paper className="account-form recover-password-form" zDepth={1} >
      <h1 className="account-form__header">Recover password</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          component={TextField}
          className="account-form__field"
          hintText="Email"
          fullWidth
        />
        <RaisedButton
          type="submit"
          className="account-form__field"
          label="RESET"
          primary
          fullWidth
        />
        <div className="account-form__field account-form__field--space-between">
          <RaisedButton label="Sign in" onClick={onLinkClick('/signin')} disabled={isLoading} />
        </div>
      </form>
    </Paper>
  </div>
);

RecoverPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default RecoverPasswordForm;
