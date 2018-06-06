import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { isEmail } from 'validator';
import SignInForm from './signInForm';
import { SIGN_IN, userSelector } from '../../ducks/ui/user';

const validate = ({ email, password }) => {
  const errors = {};
  if (!email) {
    errors.email = 'Required';
  }
  if (email && !isEmail(email)) {
    errors.email = 'It is not valid email';
  }
  if (!password) {
    errors.password = 'Required';
  }
  return errors;
};

const mapStateToProps = state => ({ isLoading: userSelector(state).isLoading });

const mapDispatchToProps = {
  onSubmit: ({ password, email }) => ({
    type: SIGN_IN,
    password,
    email,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'sign_in',
  validate,
})(SignInForm));
