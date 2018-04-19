import axios from 'axios';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import urlJoin from 'url-join';
import qs from 'qs';
import { getPageNumber, getFilters, getSelectedEventLog } from '../../selectors/eventLogSelector';
import { LOAD, RELOAD, LOAD_SUCCESS, RESET, LOAD_START, LOAD_DEBUG_INFO_SUCCESS, SHOW_DEBUG_INFO, LOAD_ERROR } from '../../ducks/data/event_log';
import { SET_CURRENT_ID } from '../../ducks/ui/selectedEventLogId';
import { API_URL } from '../../../core/constants';
import { openNotification } from '../notification';
import { showComponent } from '../dialog';
import DebugInfoViewer from '../../../event_logs/components/debug_info_viewer';

export function* errorHandler(err) {
  put({ type: LOAD_ERROR });
  if (err && err.response && err.response.data) {
    yield call(openNotification, { message: err.response.data.error });
  }
}

export function* loadEventLog() {
  const url = urlJoin(API_URL, '/events');
  try {
    const page = yield select(getPageNumber);
    const filters = yield select(getFilters);
    const queryString = qs.stringify({
      page,
      ...filters,
    }, { skipNulls: true });
    yield put({ type: LOAD_START });
    const res = yield call(axios.get, `${url}?${queryString}`);
    yield put({ type: LOAD_SUCCESS, event_logs: res.data });
  } catch (err) {
    yield call(errorHandler, err);
  }
}

export function* reloadEventLog() {
  try {
    yield put({ type: RESET });
    yield call(loadEventLog);
  } catch (err) {
    yield call(errorHandler, err);
  }
}

export function* loadDebugInfo({ event_log_id }) {
  try {
    const url = urlJoin(API_URL, `/events/${event_log_id}/debug_info`);
    yield put({ type: LOAD_START });
    const res = yield call(axios.get, url);
    yield put({
      type: LOAD_DEBUG_INFO_SUCCESS,
      debug_info: res.data,
      event_log_id,
    });
  } catch (err) {
    yield call(errorHandler, err);
  }
}

export function* showDebugInfoModal({ event_log_id }) {
  yield put({ type: SET_CURRENT_ID, event_log_id });
  const eventLog = yield select(getSelectedEventLog);
  yield showComponent({
    title: 'Debug info',
    component: DebugInfoViewer,
  });
  if (!eventLog.debug_info) {
    yield call(loadDebugInfo, { event_log_id });
  }
}

export default [
  takeLatest(LOAD, loadEventLog),
  takeLatest(RELOAD, reloadEventLog),
  takeLatest(SHOW_DEBUG_INFO, showDebugInfoModal),
];
