import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'material-ui/Table';
import InfiniteScroll from 'react-infinite-scroller';
import Paper from 'material-ui/Paper';
import { SearchNotFound, ContentSpinner } from '../../../core/';
import './event.scss';
import EventLogItem from '../event_log_item';
import shapeEvent from '../shapeEvent';
import EventLogFilters from '../filters';
/**
 * @todo Fix problem with twice call loadmore in infinite scroll
 * https://github.com/CassetteRocks/react-infinite-scroller/issues/143
 * @todo Fix problem with time in date filters
 */

class EventLog extends Component {
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
    return (
      <div className="event-log">
        <EventLogFilters />
        <InfiniteScroll
          loadMore={this.props.loadEventLog}
          threshold={1000}
          hasMore={this.props.hasMore}
          loader={<ContentSpinner key={0} />}
        >
          {this.props.list.length ? this.renderTables() : <SearchNotFound />}
        </InfiniteScroll>
      </div>
    );
  }
}

EventLog.propTypes = {
  loadEventLog: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape(shapeEvent)).isRequired,
  hasMore: PropTypes.bool.isRequired,
};

export default EventLog;
