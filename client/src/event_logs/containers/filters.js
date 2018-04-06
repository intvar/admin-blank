import { connect } from 'react-redux';
import EventLogFilters from '../components/filters';
import { load } from '../../store/ducks/data/event_log';
import { checkCode, filterChange } from '../../store/ducks/ui/event_log';


const mapStateToProps = state => state.ui.event_log.toJS();

export default connect(mapStateToProps, { filterChange, load, checkCode })(EventLogFilters);
