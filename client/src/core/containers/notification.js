import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

const mapStateToProps = (state) => {
  const notificiationState = state.ui.notification.toJS();

  return {
    message: notificiationState.message,
    open: notificiationState.open,
    autoHideDuration: notificiationState.autoHideDuration,
  };
};

export default connect(mapStateToProps, () => ({}))(Snackbar);
