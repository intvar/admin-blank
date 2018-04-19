import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Filters from './filters';
import eventCodesSelector from '../../../store/selectors/eventCodesSelector';
import { LOAD } from '../../../store/sagas/event_codes';
import { RELOAD } from '../../../store/sagas/event_log';

const mapStateToProps = state => ({
  eventCodes: eventCodesSelector(state),
});

const mapDispatchToProps = {
  onLoad: () => ({ type: LOAD }),
  onChange: () => ({ type: RELOAD }),
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'event_log_filters',
})(Filters));
