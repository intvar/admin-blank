import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import ChangePasswordForm from './changePasswordForm';
import { CHANGE_PASSWORD } from '../../ducks/ui/user';

const mapDispatchProps = {
  onSubmit: ({ new_password, old_password }) => ({
    type: CHANGE_PASSWORD,
    old_password,
    new_password,
  }),
};

const validate = ({ old_password, new_password, confirm_password }) => {
  const errors = {};
  if (!old_password) {
    errors.old_password = 'Required';
  }
  if (!new_password) {
    errors.new_password = 'Required';
  }
  if (!confirm_password) {
    errors.confirm_password = 'Required';
  }
  if (new_password && new_password.length < 8) {
    errors.new_password = 'Must be at least 8 characters';
  }
  if (new_password !== confirm_password) {
    errors.confirm_password = 'passwords don\'t match';
  }
  return errors;
};

export default connect(null, mapDispatchProps)(reduxForm({
  form: 'changePassword',
  validate,
})(ChangePasswordForm));
