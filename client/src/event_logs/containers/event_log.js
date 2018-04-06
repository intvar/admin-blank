import { connect } from 'react-redux';
import EventLog from '../components/event_log';
import { load, loadMore } from '../../store/ducks/data/event_log';
import { load as loadEventCodes } from '../../store/ducks/data/event_codes';
import eventLogSelector from '../../store/selectors/eventLogSelector';

const mapStateToProps = state => ({
  list: eventLogSelector(state),
  hasMore: state.data.event_log.hasMore,
});

const mapDispatchToProps = { loadEventCodes };

export default connect(mapStateToProps, mapDispatchToProps)(EventLog);
