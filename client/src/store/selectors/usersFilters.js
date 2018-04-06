import { createSelector } from 'reselect';

export default createSelector(
  state => state.ui.users_filters,
  users_filters => users_filters.toJS(),
);

