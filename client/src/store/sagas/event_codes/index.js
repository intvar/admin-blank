import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import urlJoin from 'url-join';
import { API_URL } from '../../../core/constants';
import { LOAD_START, LOAD_ERROR, LOAD_FINISH } from '../../ducks/data/event_codes';

export const LOAD = 'event_codes/LOAD';

export function* loadEventCodes() {
  const getId = eventCode => eventCode.id;
  try {
    const url = urlJoin(API_URL, '/event_codes');
    yield put({ type: LOAD_START });
    const res = yield call(axios.get, url);
    yield put({ type: LOAD_FINISH, event_codes: res.data.map(getId) });
  } catch (err) {
    yield put({ type: LOAD_ERROR });
  }
}

export default takeEvery(LOAD, loadEventCodes);
