import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dialogSelector from '../../store/selectors/dialogSelector';
import { acceptDialog, cancelDialog, hideDialog, outsideHideDialog } from '../../store/ducks/ui/dialog';
import Dialog from '../components/dialog';

const mapStateToProps = state => ({ options: dialogSelector(state) });
const mapDispatchToProps = dispatch => bindActionCreators({
  onAcceptDialog: acceptDialog,
  onCancelDialog: cancelDialog,
  onHideDialog: hideDialog,
  onOutsideHideDialog: outsideHideDialog,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
