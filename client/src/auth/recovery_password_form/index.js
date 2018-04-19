import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import RecoveryPasswordForm from './recoveryPasswordForm';
import userSelector from '../../store/selectors/userSelector';
import { RECOVERY_PASSWORD } from '../../store/sagas/auth';

const validate = ({ password, confirm_password }) => {
  const errors = {};
  if (!password) {
    errors.password = 'Required';
  }
  if (!confirm_password) {
    errors.confirm_password = 'Required';
  }
  if (password !== confirm_password) {
    errors.confirm_password = 'Passwords do not match';
  }
  return errors;
};

const mapStateToProps = state => ({ isLoading: userSelector(state).isLoading });
const mapDispatchToProps = (dispatch, props) => ({
  onSubmit: ({ password }) => dispatch({
    type: RECOVERY_PASSWORD,
    password,
    verify_pass_code: props.match.params.verify_pass_code,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'recovery_password',
  validate,
})(RecoveryPasswordForm));
