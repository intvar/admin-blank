import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { isEmail } from 'validator';
import SignInForm from './signInForm';
import { SIGN_IN } from '../../store/sagas/auth';
import userSelector from '../../store/selectors/userSelector';

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

const mapStateToProps = (state) => {
  const user = userSelector(state);
  return {
    errorText: user.signInError,
    isLoading: user.isLoading,
  };
};

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
