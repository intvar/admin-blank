import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { isEmail } from 'validator';
import FrogotPasswordForm from './forgotPasswordForm';
import { FORGOT_PASSWORD, userSelector } from '../../ducks/ui/user';

const validate = ({ email }) => {
  const errors = {};
  if (!email) {
    errors.email = 'Required';
  }
  if (email && !isEmail(email)) {
    errors.email = 'It is not valid email';
  }
  return errors;
};

const mapStateToProps = state => ({ isLoading: userSelector(state).isLoading });

const mapDispatchToProps = {
  onSubmit: ({ email }) => ({ type: FORGOT_PASSWORD, email }),
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'forgot_password',
  validate,
})(FrogotPasswordForm));
