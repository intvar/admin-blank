import { connect } from 'react-redux';
import Admins from '../components/list';
import adminsSelector from '../../store/selectors/adminsSelector';
import { RETRIEVE_LIST, DELETE, RELOAD } from '../../store/sagas/admins';
import { ASK_QUESTION } from '../../store/sagas/dialog';

const mapStateToProps = (state) => {
  const admins = adminsSelector(state);
  return {
    admins: admins.get('list').toList().toJS(),
    hasMoreAdmins: admins.get('hasMore'),
    isLoading: admins.get('isLoading'),
  };
};

const actionCreators = {
  onDataRequest: () => ({ type: RETRIEVE_LIST }),
  onDeleteAdmin: adminId => ({
    type: ASK_QUESTION,
    title: 'Delete admin',
    question: 'Are you sure you want to delete this admin?',
    action: {
      type: DELETE,
      adminId,
    },
  }),
  reload: () => ({ type: RELOAD }),
};

export default connect(mapStateToProps, actionCreators)(Admins);
