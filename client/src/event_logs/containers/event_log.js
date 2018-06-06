import { connect } from 'react-redux';
import EventLog from '../components/event_log';
import { LOAD, getEventLogs } from '../../ducks/data/event_log';

const mapStateToProps = (state) => {
  const eventLog = getEventLogs(state);
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
