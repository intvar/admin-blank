import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const checkboxStyles = {
  width: '200px',
};

class SetPasswordForm extends React.Component {
  constructor() {
    super();

    this.state = {
      password: '',
      password_confirm: '',
    };
  }

  onPasswordChange = (event, newValue) => {
    this.setState({ 'password': newValue });
  };

  onPasswordConfirmChange = (event, newValue) => {
    this.setState({ 'password_confirm': newValue });
  };

  onSaveClick = () => {
    this.props.onSaveClick({
      password: this.state.password,
      verify_pass_code: this.props.verifyPassCode
    });
  }

  isSaveDisabled() {
    return !Boolean(this.isCorrectPasswords() && !this.props.isLoading);
  }

  isCorrectPasswords() {
    return Boolean(this.state.password && this.state.password === this.state.password_confirm);
  }

  getNotEqualMessage() {
    const state = this.state;
    return (state.password.length && state.password.length <= state.password_confirm.length && !this.isCorrectPasswords() ) ?
      'Passwords not equal.' : '';
  }

  render() {
    return (
      <Paper className="account-form" zDepth={1} >
        <h1 className="account-form__header">Set password</h1>
        <TextField className="account-form__field" hintText="Password" fullWidth onChange={this.onPasswordChange} type="password" />
        <TextField 
          className="account-form__field" 
          hintText="Confirm password" 
          fullWidth 
          onChange={this.onPasswordConfirmChange} 
          type="password"
          errorText={this.getNotEqualMessage()}
        />
        <RaisedButton label="save" primary fullWidth onClick={this.onSaveClick} disabled={this.isSaveDisabled()} />
      </Paper>
    );
  }
}

SetPasswordForm.propTypes = {
  verifyPassCode: PropTypes.string.isRequired,
  onSaveClick: PropTypes.func.isRequired,
};

export default SetPasswordForm;
