import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import pick from 'lodash/pick';
import { isEmail } from 'validator';
import AdminEditor from '../components/editor';
import { RETRIEVE_ONE, UPDATE, CREATE } from '../../store/sagas/admins';
import getAdmins from '../../store/selectors/adminsSelector';
import { ADMIN_STATUS_WAITING_VERIFYING } from '../constants';
import history from '../../core/utils';
import { OPEN_NOTIFICATION } from '../../store/ducks/ui/notification';

const validate = ({ first_name, last_name, email }) => {
  const errors = {};
  if (!first_name) {
    errors.first_name = 'Required';
  }
  if (!last_name) {
    errors.last_name = 'Required';
  }
  if (first_name && first_name.length > 50) {
    errors.first_name = 'Must be 50 characters or less';
  }
  if (last_name && last_name.length > 50) {
    errors.last_name = 'Must be 50 characters or less';
  }
  if (!email) {
    errors.email = 'Required';
  }
  if (email && email.length > 50) {
    errors.email = 'Must be 50 characters or less';
  }
  if (email && !isEmail(email)) {
    errors.email = 'It\'s not valid email ';
  }
  return errors;
};

const mapStateToProps = (state, props) => {
  const adminId = props.match.params.id;
  const admins = getAdmins(state);
  const adminMap = admins.getIn(['list', adminId]);
  const admin = adminMap && pick(
    adminMap.toJS(),
    ['status', 'email', 'first_name', 'last_name'],
  );
  return {
    isLoading: admins.get('isLoading'),
    adminId,
    initialValues: { status: ADMIN_STATUS_WAITING_VERIFYING, ...admin },
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const adminId = props.match.params.id;
  const submitAction = adminId ? UPDATE : CREATE;
  const cb = () => {
    history.push('/admins');
    dispatch({
      type: OPEN_NOTIFICATION,
      message: `admin ${adminId ? 'saved' : 'created'} successfully`,
    });
  };
  return {
    onSubmit: admin => dispatch({
      type: submitAction,
      admin,
      adminId,
      cb,
    }),
    onAdminFetch: () => dispatch({ type: RETRIEVE_ONE, adminId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'adminEditor',
  validate,
})(AdminEditor));
