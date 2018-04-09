import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { isEmail } from 'validator';
import RecoverPasswordForm from './recoverPasswordForm';
import { recoverPassword } from '../../../store/ducks/ui/user';

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

export default connect(null, { onSubmit: recoverPassword })(reduxForm({
  form: 'recover_password',
  validate,
})(RecoverPasswordForm));
