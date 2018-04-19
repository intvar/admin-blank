import { connect } from 'react-redux';
import EventLog from '../components/event_log';
import { LOAD } from '../../store/sagas/event_log';
import eventLogSelector from '../../store/selectors/eventLogSelector';

const mapStateToProps = (state) => {
  const eventLog = eventLogSelector(state);
  return {
    list: eventLog.get('list').toList().toJS(),
    hasMore: eventLog.get('hasMore'),
    isLoading: eventLog.get('isLoading'),
  };
};

const mapDispatchToProps = {
  loadEventLog: () => ({ type: LOAD }),
};

export default connect(mapStateToProps, mapDispatchToProps)(EventLog);
