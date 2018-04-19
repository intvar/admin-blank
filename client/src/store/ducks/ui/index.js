import { combineReducers } from 'redux';
import notification from './notification';
import loader from './loader';
import dialog from './dialog';
import users_filters from './usersFilters';
import user from './user';
import selectedEventLogId from './selectedEventLogId';
import leftMenu from './leftMenu';

const ui = combineReducers({
  notification,
  loader,
  dialog,
  users_filters,
  user,
  leftMenu,
  selectedEventLogId,
});

export default ui;
