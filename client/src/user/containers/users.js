import { connect } from 'react-redux';
import Users from '../components/users';
import usersSelector from '../../store/selectors/usersSelector';
import { fetchUsers, fetchMoreUsers, showDeleteDialog } from '../../store/ducks/data/users';

const mapStateToProps = state => ({
  users: usersSelector(state),
  hasMoreUsers: state.data.users.get('hasMoreUsers'),
  isLoading: state.data.users.get('isLoading'),
  userPermission: state.data.user.toJS().personalData.permissions,
});

const actionCreators = {
  onDataRequest: fetchUsers,
  onMoreDataRequest: fetchMoreUsers,
  onDeleteUser: showDeleteDialog,
};

export default connect(mapStateToProps, actionCreators)(Users);
