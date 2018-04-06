import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Filters from './filters';
import eventCodesSelector from '../../../store/selectors/eventCodesSelector';
import { load as loadEventCodes } from '../../../store/ducks/data/event_codes';

const mapStateToProps = state => ({
  eventCodes: eventCodesSelector(state),
});

const mapDispatchToProps = { loadEventCodes };

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'event_log_filters',
})(Filters));
