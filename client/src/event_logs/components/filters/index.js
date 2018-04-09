import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Filters from './filters';
import eventCodesSelector from '../../../store/selectors/eventCodesSelector';
import { load as onLoad } from '../../../store/ducks/data/event_codes';
import { reload as onSubmit } from '../../../store/ducks/data/event_log';

const mapStateToProps = state => ({
  eventCodes: eventCodesSelector(state),
});

const mapDispatchToProps = {
  onLoad,
  onSubmit,
  initialValues: {
    event_date_from: null,
    event_date_to: null,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'event_log_filters',
})(Filters));
