import React from 'react';
import { Field } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ActionRestoreIcon from 'material-ui/svg-icons/action/lock';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const checkboxStyles = {
  width: '200px',
};

const SignInForm = ({ handleSubmit, isLoading, errorText }) => (
  <div className="account-page">
    <Paper className="account-form" zDepth={1} >
      <h1 className="account-form__header">Sign in</h1>
      <form onSubmit={handleSubmit}>
        <Field
          name="email"
          component={TextField}
          className="account-form__field"
          hintText="Email"
          fullWidth
        />
        <Field
          name="password"
          component={TextField}
          className="account-form__field"
          hintText="Password"
          fullWidth
          type="password"
        />
        <div className="account-form__field account-form__field--space-between">
          <Checkbox label="Remember me" style={checkboxStyles} disabled />
          <FlatButton
            label="Forgot pwd?"
            labelPosition="after"
            icon={<ActionRestoreIcon />}
            containerElement={<Link to="recover_password" />}
          />
        </div>
        <div className="account-form__error"> {errorText} </div>
        {
        isLoading ?
          <CircularProgress className="account-form__loader" /> :
          <RaisedButton
            className="account-form__field"
            label="SIGN IN"
            primary
            fullWidth
            type="sumbit"
          />
        }
      </form>
    </Paper>
  </div>
);

SignInForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorText: PropTypes.string,
};

SignInForm.defaultProps = {
  errorText: null,
};

export default SignInForm;
