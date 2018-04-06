import { createSelector } from 'reselect';

export default createSelector(state => state.ui.eventLogDebugInfo, state => state.toJS());
