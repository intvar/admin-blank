import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import App from '../components/app';
import { SIGN_OUT } from '../../store/sagas/auth';
import userSelector from '../../store/selectors/userSelector';

const mapStateToProps = (state) => {
  const userData = userSelector(state);
  return {
    isAuthorized: userData.isAuthorized,
    isLoading: userData.isLoading,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  onSignOutClick: () => ({ type: SIGN_OUT }),
}, dispatch);

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppContainer;
