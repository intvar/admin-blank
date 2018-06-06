import { connect } from 'react-redux';
import DebugInfoViewer from './debug_info_viewer';
import { getEventLogs, getSelectedEventLog } from '../../../ducks/data/event_log';

const mapStateToProps = (state) => {
  const isLoading = getEventLogs(state).get('isLoading');
  const currentEventLog = getSelectedEventLog(state);
  const debugInfo = currentEventLog && currentEventLog.debug_info;
  return {
    isLoading,
    debugInfo: debugInfo || null,
  };
};

export default connect(mapStateToProps)(DebugInfoViewer);
