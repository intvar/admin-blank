import React from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import CheckIcon from 'material-ui/svg-icons/navigation/check';
import ErrorIcon from 'material-ui/svg-icons/alert/error';
import { red500, green500 } from 'material-ui/styles/colors';
import shapeEvent from '../shapeEvent';

import './style.scss';

export default class EventLogItem extends React.PureComponent {
  static getHumanReadableDate(date) {
    return new Date(date).toLocaleString();
  }

  static getStatusIcon(isError) {
    return isError ? <ErrorIcon color={red500} /> : <CheckIcon color={green500} />;
  }

  constructor() {
    super();

    this.getClickHandler = itemId => () => this.props.onViewDebugInfo(itemId);
  }

  render() {
    const {
      id,
      event_id,
      event_date,
      is_error,
      description,
      user_id,
    } = this.props;

    return (
      <TableRow className="event-log__item" onClick={this.getClickHandler(id)}>
        <TableRowColumn className="event-log__column-event">{event_id}</TableRowColumn>
        <TableRowColumn className="event-log__column-date">
          {EventLogItem.getHumanReadableDate(event_date)}
        </TableRowColumn>
        <TableRowColumn className="event-log__column-is-err">
          {EventLogItem.getStatusIcon(is_error)}
        </TableRowColumn>
        <TableRowColumn className="event-log__column-user">{user_id}</TableRowColumn>
        <TableRowColumn>{description || '-'}</TableRowColumn>
      </TableRow>
    );
  }
}

EventLogItem.propTypes = {
  ...shapeEvent,
  onViewDebugInfo: PropTypes.func.isRequired,
};
