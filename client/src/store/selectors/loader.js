import { createSelector } from 'reselect';

export default createSelector(
  state => state.ui.loader,
  loader => loader.get('isLoading'),
);
