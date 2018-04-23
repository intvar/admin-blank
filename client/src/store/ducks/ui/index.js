import { combineReducers } from 'redux';
import notification from './notification';
import loader from './loader';
import dialog from './dialog';
import user from './user';
import selectedEventLogId from './selectedEventLogId';
import leftMenu from './leftMenu';
import title from './title';

const ui = combineReducers({
  notification,
  loader,
  dialog,
  user,
  leftMenu,
  selectedEventLogId,
  title,
});

export default ui;
