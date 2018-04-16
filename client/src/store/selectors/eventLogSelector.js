import { createSelector } from 'reselect';

export default createSelector(
  state => state.data.event_log,
  event_log => event_log,
);

export const getPageNumber = createSelector(
  state => state.data.event_log,
  event_log => event_log.get('pageNumber'),
);

export const getFilters = createSelector(
  state => state.form.event_log_filters,
  event_log_filters => event_log_filters.values,
);

export const getSelectedEventLog = createSelector(
  [
    state => state.data.event_log,
    state => state.ui.selectedEventLogId,
  ],
  (eventLog, eventLogId) => eventLog.getIn(['list', String(eventLogId)]),
);
