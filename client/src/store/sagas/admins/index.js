import axios from 'axios';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import urlJoin from 'url-join';
import { stringify } from 'qs';
import { API_URL } from '../../../core/constants';
import {
  START,
  CREATE_SUCCESS,
  RETRIEVE_LIST_SUCCESS,
  RETRIEVE_ONE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
  ERROR,
  RESET,
} from '../../ducks/data/admins';
import { openNotification } from '../notification';
import { getPageNumber } from '../../selectors/adminsSelector';

const url = urlJoin(API_URL, '/admins');

export const RETRIEVE_LIST = 'admins/RETRIEVE_LIST';
export const RETRIEVE_ONE = 'admins/RETRIEVE_ONE';
export const UPDATE = 'admins/UPDATE';
export const DELETE = 'admins/DELETE';
export const CREATE = 'admins/CREATE';
export const RELOAD = 'admins/RELOAD';

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

export default [
  takeLatest(CREATE, create),
  takeLatest(RETRIEVE_LIST, retrieveList),
  takeLatest(RETRIEVE_ONE, retrieveOne),
  takeLatest(UPDATE, update),
  takeLatest(DELETE, deleteAdmin),
  takeLatest(RELOAD, reload),
];
