import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import pick from 'lodash/pick';
import UserEditor from '../components/user_editor';
import { RETRIEVE_ONE, UPDATE, usersSelector } from '../../ducks/data/users';

const validate = ({ first_name, last_name }) => {
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
  return errors;
};

const mapStateToProps = (state, props) => {
  const userId = props.match.params.id;
  const users = usersSelector(state);
  const userMap = users.getIn(['list', userId]);
  return {
    isLoading: users.get('isLoading'),
    id: userId,
    initialValues: userMap && pick(
      userMap.toJS(),
      ['status', 'email', 'first_name', 'last_name', 'gender', 'birthdate'],
    ),
  };
};

const mapDispatchToProps = (dispatch, props) => {
  const userId = props.match.params.id;
  return {
    onSubmit: user => dispatch({ type: UPDATE, user, userId }),
    onUserFetch: () => dispatch({ type: RETRIEVE_ONE, userId }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'userEditor',
  validate,
})(UserEditor));
