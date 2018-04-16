import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { SearchNotFound, ContentSpinner, InfiniteScroll } from '../../../core/';
import './event.scss';
import EventLogItem from '../event_log_item';
import shapeEvent from '../shapeEvent';
import EventLogFilters from '../filters';

class EventLog extends Component {
  componentDidMount() {
    this.props.loadEventLog();
  }
  renderTables() {
    return (
      <Paper className="event-log__table-wrap">
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn className="event-log__column-event">Event</TableHeaderColumn>
              <TableHeaderColumn className="event-log__column-date">Date</TableHeaderColumn>
              <TableHeaderColumn className="event-log__column-is-err">Status</TableHeaderColumn>
              <TableHeaderColumn className="event-log__column-user">User id</TableHeaderColumn>
              <TableHeaderColumn>Descriptions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { this.props.list.map(event => <EventLogItem key={event.id} {...event} />) }
          </TableBody>
        </Table>
      </Paper>);
  }
  render() {
    const {
      hasMore,
      loadEventLog,
      isLoading,
      list,
    } = this.props;
    return (
      <div className="event-log">
        <EventLogFilters />
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={isLoading}
          onLoadMore={loadEventLog}
        >
          { (!list.length && !isLoading) ? <SearchNotFound /> : null }
          { list.length ? this.renderTables() : null}
          { isLoading ? <ContentSpinner /> : null }
        </InfiniteScroll>
      </div>
    );
  }
}

EventLog.propTypes = {
  loadEventLog: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape(shapeEvent)).isRequired,
  hasMore: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default EventLog;
