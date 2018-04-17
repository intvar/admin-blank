import { all } from 'redux-saga/effects';
import authSagas from './auth';
import eventCodes from './event_codes';
import eventLog from './event_log';
import users from './users';
import admins from './admins';
import dialog from './dialog';
import notification from './notification';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...eventLog,
    ...users,
    ...admins,
    ...dialog,
    eventCodes,
    notification,
  ]);
}
