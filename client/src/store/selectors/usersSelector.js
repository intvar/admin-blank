import { createSelector } from 'reselect';

export default createSelector(state => state.data.users, users => users);

export const getPageNumber = createSelector(
  state => state.data.users,
  users => users.get('pageNumber'),
);

export const getList = createSelector(
  state => state.data.users,
  users => users.get('list'),
);
