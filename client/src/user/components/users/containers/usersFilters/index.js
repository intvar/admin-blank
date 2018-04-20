import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import UsersFiltersForm from './usersFiltersForm';
import { RELOAD } from '../../../../../store/sagas/users';

const mapDispatchToProps = {
  onChange: () => ({ type: RELOAD }),
};

export default connect(null, mapDispatchToProps)(reduxForm({
  form: 'usersFilters',
})(UsersFiltersForm));
