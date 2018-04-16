import { connect } from 'react-redux';
import dialogSelector from '../../store/selectors/dialogSelector';
import Dialog from '../components/dialog';
import { HIDE } from '../../store/ducks/ui/dialog';

const mapStateToProps = state => (dialogSelector(state));
const mapDispatchToProps = {
  closeDialog: () => ({ type: HIDE }),
};


export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
