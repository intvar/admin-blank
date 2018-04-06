import { createSelector } from 'reselect';

export default createSelector(state => state.ui.dialog, immutableMap => immutableMap.toJS());
