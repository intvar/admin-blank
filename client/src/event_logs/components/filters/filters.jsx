import React, { Component } from 'react';
import { Field } from 'redux-form';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { DatePicker } from 'redux-form-material-ui';
import IsErrorFilter from './isErrorFilter';
import CodesFilter from './CodesFilter';
import './style.scss';

class EventLogFilters extends Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    const { handleSubmit, eventCodes, reset } = this.props;
    return (
      <Paper className="events-filters">
        <form onSubmit={handleSubmit}>
          <IsErrorFilter />
          <CodesFilter codes={eventCodes} />
          <div className="events-filters__dates">
            <Field
              component={DatePicker}
              name="event_date_from"
              hintText="Date from"
              format={null}
            />
            <Field
              component={DatePicker}
              name="event_date_to"
              hintText="Date to"
              className="events-filters__dates-right"
              format={null}
            />
          </div>
          <RaisedButton className="events-filters__button" label="Apply" primary type="submit" />
          <RaisedButton className="events-filters__button-reset" label="Reset" onClick={reset} />
        </form>
      </Paper>
    );
  }
}

EventLogFilters.propTypes = {
  eventCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export default EventLogFilters;
