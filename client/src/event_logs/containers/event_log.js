import { connect } from 'react-redux';
import EventLog from '../components/event_log';
import { load as loadEventLog } from '../../store/ducks/data/event_log';
import eventLogSelector from '../../store/selectors/eventLogSelector';

const mapStateToProps = (state) => {
  const eventLog = eventLogSelector(state);
  return {
    list: eventLog.get('list').toList().toJS(),
    hasMore: eventLog.get('hasMore'),
  };
};

const mapDispatchToProps = { loadEventLog };

export default connect(mapStateToProps, mapDispatchToProps)(EventLog);
