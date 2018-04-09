import { createSelector } from 'reselect';

export default createSelector(state => state.ui.user, user => user.toJS());
// export default createSelector(state => state.data.user, user => user.toJS().personalData);
