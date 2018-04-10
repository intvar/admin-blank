import axios from 'axios';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import urlJoin from 'url-join';
import qs from 'qs';
import { getPageNumber, getFilters } from '../../selectors/eventLogSelector';
import { LOAD, RELOAD, loadStart, loadSuccess, reset } from '../../ducks/data/event_log';
import { API_URL } from '../../../core/constants';
import { openNotification } from '../../ducks/ui/notification';

const url = urlJoin(API_URL, '/events');

export function* loadEventLog() {
  try {
    const page = yield select(getPageNumber);
    const filters = yield select(getFilters);
    const queryString = qs.stringify({
      page,
      ...filters,
    });
    yield put(loadStart());
    const res = yield call(axios.get, `${url}?${queryString}`);
    yield put(loadSuccess(res.data));
  } catch (err) {
    console.log(err.data);
    // openNotification(err.data.error);
  }
}

export function* reloadEventLog() {
  try {
    yield put(reset());
    yield call(loadEventLog);
  } catch (err) {
    console.log(err);
  }
}

export default [
  takeLatest(LOAD, loadEventLog),
  takeLatest(RELOAD, reloadEventLog),
];
