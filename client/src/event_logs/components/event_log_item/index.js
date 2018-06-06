import { connect } from 'react-redux';
import EventLogItem from './event_log_item';
import { SHOW_DEBUG_INFO } from '../../../ducks/data/event_log';

const mapStateToProps = (state, props) => ({
  ...props,
});

const mapDispatchToProps = {
  onViewDebugInfo: event_log_id => ({ type: SHOW_DEBUG_INFO, event_log_id }),
};

export default connect(mapStateToProps, mapDispatchToProps)(EventLogItem);
