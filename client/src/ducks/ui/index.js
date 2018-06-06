import { combineReducers } from 'redux';
import notification, { moduleName as notificationModule } from './notification';
import loader, { moduleName as loaderModule } from './loader';
import dialog, { moduleName as dialogModule } from './dialog';
import user, { moduleName as userModule } from './user';
import selectedEventLogId, { moduleName as selectedEventLogIdModule } from './selectedEventLogId';
import leftMenu, { moduleName as leftMenuModule } from './leftMenu';

const ui = combineReducers({
  [notificationModule]: notification,
  [loaderModule]: loader,
  [dialogModule]: dialog,
  [userModule]: user,
  [selectedEventLogIdModule]: selectedEventLogId,
  [leftMenuModule]: leftMenu,
});

export default ui;
