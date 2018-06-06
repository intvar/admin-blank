import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Filters from './filters';
import { LOAD, eventCodesSelector } from '../../../ducks/data/event_codes';
import { RELOAD } from '../../../ducks/data/event_log';

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
