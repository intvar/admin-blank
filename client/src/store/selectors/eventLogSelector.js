import { createSelector } from 'reselect';

export default createSelector(state => state.data.event_log.list, events => events.toJS());
