import { all } from 'redux-saga/effects';
import authSagas from './auth';
import eventCodes from './event_codes';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    eventCodes,
  ]);
}
