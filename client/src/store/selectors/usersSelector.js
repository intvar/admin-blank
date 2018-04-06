import { createSelector } from 'reselect';

export default createSelector(state => state.data.users.get('users'), users => users.toJS());
