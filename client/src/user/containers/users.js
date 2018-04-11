import { connect } from 'react-redux';
import Users from '../components/users';
import usersSelector from '../../store/selectors/usersSelector';
import { RETRIEVE_LIST, DELETE } from '../../store/ducks/data/users';

const mapStateToProps = (state) => {
  const users = usersSelector(state);
  return {
    users: users.get('list').toList().toJS(),
    hasMoreUsers: users.get('hasMore'),
    isLoading: users.get('isLoading'),
  };
};

const actionCreators = {
  onDataRequest: () => ({ type: RETRIEVE_LIST }),
  onDeleteUser: userId => ({ type: DELETE, userId }),
};

export default connect(mapStateToProps, actionCreators)(Users);
