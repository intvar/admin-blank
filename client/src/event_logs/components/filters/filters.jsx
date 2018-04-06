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
    this.props.loadEventCodes();
  }
  render() {
    const { handleSubmit, eventCodes } = this.props;
    return (
      <Paper className="events-filters">
        <form onSubmit={handleSubmit}>
          <IsErrorFilter />
          <CodesFilter codes={eventCodes} />
          <div className="events-filters__dates">
            <Field component={DatePicker} name="event_date_from" hintText="Date from" />
            <Field component={DatePicker} name="event_date_ti" hintText="Date to" />
          </div>
          <RaisedButton className="events-filters__button" label="Apply" primary type="submit" />
        </form>
      </Paper>
    );
  }
}

EventLogFilters.propTypes = {
  eventCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loadEventCodes: PropTypes.func.isRequired,
};

export default EventLogFilters;
