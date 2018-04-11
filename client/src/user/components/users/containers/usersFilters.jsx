import { connect } from 'react-redux';
import UsersFilters from '../components/usersFilters';
import { searchCriterionChange, statusChange, kycStatusChange, resetFiltersAndRefetchUsers } from '../../../../store/ducks/ui/usersFilters';
import { fetchUsers } from '../../../../store/ducks/data/users';
import usersFilterSelector from '../../../../store/selectors/usersFilters';

const mapStateToProps = state => usersFilterSelector(state);

const mapDispatchToProps = {
  onChangeSearchCriterion: searchCriterionChange,
  onChangeStatus: statusChange,
  onClickApply: fetchUsers,
  onClickReset: resetFiltersAndRefetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersFilters);
