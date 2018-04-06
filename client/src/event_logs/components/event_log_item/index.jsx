import { connect } from 'react-redux';
import EventLogItem from './event_log_item';
import { showDebugInfo } from '../../../store/ducks/ui/event_log_debug_info';

const mapStateToProps = (state, props) => ({
  ...props,
});

const mapDispatchToProps = {
  onViewDebugInfo: showDebugInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventLogItem);
