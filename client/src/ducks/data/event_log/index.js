import { Map, OrderedMap } from 'immutable';
import mapKeys from 'lodash/mapKeys';
import axios from 'axios';
import { put, call, select, takeLatest } from 'redux-saga/effects';
import urlJoin from 'url-join';
import qs from 'qs';
import { createSelector } from 'reselect';
import { SET_CURRENT_ID } from '../../../ducks/ui/selectedEventLogId';
import { API_URL } from '../../../core/constants';
import { openNotification } from '../../ui/notification';
import { showComponent } from '../../ui/dialog';
import DebugInfoViewer from '../../../event_logs/components/debug_info_viewer';
import { appName } from '../../../config';

export const moduleName = 'event_log';
const prefix = `${appName}/${moduleName}`;

const limit = 40;
export const LOAD_START = `${prefix}/LOAD_START`;
export const LOAD_SUCCESS = `${prefix}/LOAD_SUCCEESS`;
export const LOAD_DEBUG_INFO_SUCCESS = `${prefix}/LOAD_DEBUG_INFO_SUCCESS`;
export const LOAD_ERROR = `${prefix}/LOAD_ERROR`;
export const RESET = `${prefix}/RESET`;

export const initialState = Map({
  list: OrderedMap(),
  pageNumber: 1,
  hasMore: true,
  isLoading: false,
});

const getOrderedMapEventLogs = event_logs => OrderedMap(mapKeys(event_logs, 'id')).reverse();

export default (state = initialState, {
  type,
  event_logs,
  debug_info,
  event_log_id,
}) => {
  switch (type) {
    case LOAD_START:
      return state.set('isLoading', true);
    case LOAD_SUCCESS:
      return state.merge({
        isLoading: false,
        pageNumber: state.get('pageNumber') + 1,
        hasMore: (event_logs.length === limit),
        list: state.get('list').merge(getOrderedMapEventLogs(event_logs)),
      });
    case LOAD_DEBUG_INFO_SUCCESS:
      return state.updateIn(['list', String(event_log_id)], i => ({ ...i, debug_info }))
        .set('isLoading', false);
    case RESET:
      return initialState;
    case LOAD_ERROR:
      return state.set('isLoading', false);
    default:
      return state;
  }
};

export const LOAD = '/event_log/LOAD';
export const RELOAD = '/event_log/RELOAD';
export const SHOW_DEBUG_INFO = '/event_log/SHOW_DEBUG_INFO';

export const getEventLogs = state => state.data[moduleName];

export const getPageNumber = createSelector(
  state => state.data[moduleName],
  event_log => event_log.get('pageNumber'),
);

export const getFilters = createSelector(
  state => state.form.event_log_filters,
  event_log_filters => event_log_filters.values,
);

export const getSelectedEventLog = createSelector(
  [
    state => state.data[moduleName],
    state => state.ui.selectedEventLogId,
  ],
  (eventLog, eventLogId) => eventLog.getIn(['list', String(eventLogId)]),
);


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

export const sagas = [
  takeLatest(LOAD, loadEventLog),
  takeLatest(RELOAD, reloadEventLog),
  takeLatest(SHOW_DEBUG_INFO, showDebugInfoModal),
];

