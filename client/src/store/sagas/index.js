import { all } from 'redux-saga/effects';
import authSagas from './auth';
import eventCodes from './event_codes';
import eventLog from './event_log';
import users from './users';
import dialog from './dialog';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...eventLog,
    ...users,
    ...dialog,
    eventCodes,
  ]);
}
