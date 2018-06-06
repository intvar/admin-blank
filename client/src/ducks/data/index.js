import { combineReducers } from 'redux';
import event_log, { moduleName as eventLogModule } from './event_log';
import event_codes, { moduleName as eventCodesModule } from './event_codes';
import users, { moduleName as eventUsersModule } from './users';
import admins, { moduleName as adminsModule } from './admins';

const data = combineReducers({
  [eventLogModule]: event_log,
  [eventCodesModule]: event_codes,
  [eventUsersModule]: users,
  [adminsModule]: admins,
});
export default data;

