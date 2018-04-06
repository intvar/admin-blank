import { createSelector } from 'reselect';

export default createSelector(
  state => state.data.event_codes,
  event_codes => event_codes.toJS().list,
);
