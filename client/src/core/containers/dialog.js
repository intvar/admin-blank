import { connect } from 'react-redux';
import { dialogSelector, HIDE } from '../../ducks/ui/dialog';
import Dialog from '../components/dialog';

const mapStateToProps = state => (dialogSelector(state));
const mapDispatchToProps = {
  closeDialog: () => ({ type: HIDE }),
};


export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
