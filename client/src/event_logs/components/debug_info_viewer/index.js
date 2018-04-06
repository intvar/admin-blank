import { connect } from 'react-redux';
import eventLogDebugInfoSelector from '../../../store/selectors/eventLogDebugInfoSelector';
import DebugInfoViewer from './debug_info_viewer';

export default connect(state => eventLogDebugInfoSelector(state))(DebugInfoViewer);
