import { all } from 'redux-saga/effects';
import authSagas from './auth';
import eventCodes from './event_codes';
import eventLog from './event_log';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...eventLog,
    eventCodes,
  ]);
}
