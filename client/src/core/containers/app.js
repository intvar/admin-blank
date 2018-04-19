import { connect } from 'react-redux';
import App from '../components/app';
import userSelector from '../../store/selectors/userSelector';

const mapStateToProps = (state) => {
  const userData = userSelector(state);
  return {
    isAuthorized: userData.isAuthorized,
    isLoading: userData.isLoading,
  };
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
