import { combineReducers } from 'redux';
import navigation from './navigation';
import notification from './notification';
import loader from './loader';
import event_log from './event_log';
import dialog from './dialog';
import users_filters from './usersFilters';
import eventLogDebugInfo from './event_log_debug_info';

const ui = combineReducers({
  navigation,
  notification,
  loader,
  event_log,
  dialog,
  users_filters,
  eventLogDebugInfo,
});

export default ui;
