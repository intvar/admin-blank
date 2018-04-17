import { createSelector } from 'reselect';

export default createSelector(state => state.data.admins, admins => admins);

export const getPageNumber = createSelector(
  state => state.data.admins,
  admins => admins.get('pageNumber'),
);

export const getList = createSelector(
  state => state.data.admins,
  admins => admins.get('list'),
);
