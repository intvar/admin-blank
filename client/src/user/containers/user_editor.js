import { connect } from 'react-redux';
import UserEditor from '../components/user_editor';
import { updateUser, fetchUser, addUser } from '../../store/ducks/data/users';

const mapStateToProps = (state, props) => ({
  user: props.match.params.id ? state.data.users.get('users').find(user => user.id === +props.match.params.id) : null,
  action: props.match.params.action,
  isLoading: state.ui.loader.get('isLoading'),
  id: props.match.params.id,
  userPermission: state.data.user.toJS().personalData.permissions,
});

const actionsMap = {
  onUserSave: updateUser,
  onUserAdd: addUser,
  onUserFetch: fetchUser,
};

export default connect(mapStateToProps, actionsMap)(UserEditor);
