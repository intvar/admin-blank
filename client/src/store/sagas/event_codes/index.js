import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import urlJoin from 'url-join';
import { API_URL } from '../../../core/constants';
import { LOAD, loadStart, loadError, loadFinish } from '../../ducks/data/event_codes';

export function* loadEventCodes() {
  const getId = eventCode => eventCode.id;
  try {
    const url = urlJoin(API_URL, '/event_codes');
    yield put(loadStart());
    const res = yield call(axios.get, url);
    yield put(loadFinish(res.data.map(getId)));
  } catch (err) {
    yield put(loadError());
  }
}

export default takeEvery(LOAD, loadEventCodes);
