import { createSelector } from 'reselect';

export default createSelector(state => state.data.users, users => users.toJS());

export const getPageNumber = createSelector(
  state => state.data.users,
  users => users.get('pageNumber'),
);
