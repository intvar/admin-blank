import { Map } from 'immutable';
import mapKeys from 'lodash/mapKeys';
import axios from 'axios';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import urlJoin from 'url-join';
import { stringify } from 'qs';
import { createSelector } from 'reselect';
import { API_URL } from '../../../core/constants';
import { openNotification } from '../../ui/notification';

const limit = 20;

export const initialState = Map({
  list: Map(),
  pageNumber: 1,
  hasMore: true,
  isLoading: false,
});

export const START = 'admins/START';
export const CREATE = 'admins/CREATE';
export const CREATE_SUCCESS = 'admins/CREATE_SUCCESS';
export const RETRIEVE_LIST = 'admins/RETRIEVE_LIST';
export const RETRIEVE_LIST_SUCCESS = 'admins/RETRIEVE_LIST_SUCCESS';
export const RETRIEVE_ONE = 'admins/RETRIEVE_ONE';
export const RETRIEVE_ONE_SUCCESS = 'admins/RETRIEVE_ONE_SUCCESS';
export const UPDATE = 'admins/UPDATE';
export const UPDATE_SUCCESS = 'admins/UPDATE_SUCCESS';
export const DELETE = 'admins/DELETE';
export const DELETE_SUCCESS = 'admins/DELETE_SUCCESS';
export const ERROR = 'admins/ERROR';
export const RESET = 'admins/RESET';
export const RELOAD = 'admins/RELOAD';

export default (
  state = initialState,
  {
    type,
    admin,
    admins,
    adminId,
  },
) => {
  const adminIdStr = String(adminId);
  switch (type) {
    case START:
      return state.set('isLoading', true);
    case CREATE_SUCCESS:
      return state.merge({
        isLoading: false,
        list: state.get('list').merge({ [adminId]: { id: adminId, ...admin } }),
      });
    case RETRIEVE_ONE_SUCCESS:
      return state.merge({
        isLoading: false,
        list: state.get('list').merge({ [admin.id]: admin }),
      });
    case RETRIEVE_LIST_SUCCESS:
      return state.merge({
        isLoading: false,
        list: state.get('list').merge(mapKeys(admins, 'id')),
        pageNumber: state.get('pageNumber') + 1,
        hasMore: (admins.length === limit),
      });
    case UPDATE_SUCCESS:
      return state.updateIn(['list', adminIdStr], u => u.merge(admin)).set('isLoading', false);
    case DELETE_SUCCESS:
      return state.deleteIn(['list', adminIdStr]).set('isLoading', false);
    case ERROR:
      return state.set('isLoading', false);
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export const getAdmins = createSelector(
  state => state.data.admins,
  admins => admins,
);

export const getPageNumber = createSelector(
  state => state.data.admins,
  admins => admins.get('pageNumber'),
);

export const getList = createSelector(
  state => state.data.admins,
  admins => admins.get('list'),
);

const url = urlJoin(API_URL, '/admins');

export function* errorHandler(err) {
  yield put({ type: ERROR });
  if (err && err.response && err.response.data) {
    yield call(openNotification, { message: err.response.data.error });
  }
}

export function* create({ admin, cb }) {
  try {
    yield put({ type: START });
    const res = yield call(axios.post, url, admin);
    yield put({ type: CREATE_SUCCESS, admin, adminId: res.data.id });
    if (cb) yield call(cb);
  } catch (err) {
    yield call(errorHandler, err);
  }
}

export function* retrieveList() {
  try {
    yield put({ type: START });
    const page = yield select(getPageNumber);
    const queryString = stringify({ page });
    const res = yield call(axios.get, `${url}?${queryString}`);
    yield put({ type: RETRIEVE_LIST_SUCCESS, admins: res.data });
  } catch (err) {
    yield call(errorHandler, err);
  }
}

export function* retrieveOne({ adminId }) {
  try {
    yield put({ type: START });
    const res = yield call(axios.get, `${url}/${adminId}`);
    yield put({ type: RETRIEVE_ONE_SUCCESS, admin: res.data });
  } catch (err) {
    yield call(errorHandler, err);
  }
}

export function* update({ admin, adminId, cb }) {
  try {
    yield put({ type: START });
    yield call(axios.put, `${url}/${adminId}`, admin);
    yield put({ type: UPDATE_SUCCESS, admin, adminId });
    if (cb) yield call(cb);
  } catch (err) {
    yield call(errorHandler, err);
  }
}

export function* deleteAdmin({ adminId }) {
  try {
    yield put({ type: START });
    yield call(axios.delete, `${url}/${adminId}`);
    yield put({ type: DELETE_SUCCESS, adminId });
  } catch (err) {
    yield call(errorHandler, err);
  }
}

export function* reload() {
  try {
    yield put({ type: RESET });
    yield call(retrieveList);
  } catch (err) {
    yield call(errorHandler, err);
  }
}

export const sagas = [
  takeLatest(CREATE, create),
  takeLatest(RETRIEVE_LIST, retrieveList),
  takeLatest(RETRIEVE_ONE, retrieveOne),
  takeLatest(UPDATE, update),
  takeLatest(DELETE, deleteAdmin),
  takeLatest(RELOAD, reload),
];
