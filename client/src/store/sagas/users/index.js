import axios from 'axios';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import urlJoin from 'url-join';
import { stringify } from 'qs';
import { API_URL } from '../../../core/constants';
import {
  START,
  RETRIEVE_LIST_SUCCESS,
  RETRIEVE_ONE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
  ERROR,
  RESET,
} from '../../ducks/data/users';
import { openNotification } from '../notification';
import { getPageNumber, getFilters } from '../../selectors/usersSelector';
import history from '../../../core/utils';

export const RETRIEVE_LIST = '/users/RETRIEVE_LIST';
export const RETRIEVE_ONE = '/users/RETRIEVE_ONE';
export const UPDATE = '/users/UPDATE';
export const DELETE = '/users/DELETE';
export const RELOAD = '/users/RELOAD';

const url = urlJoin(API_URL, '/users');

export function* errorHandler(err) {
  yield put({ type: ERROR });
  if (err && err.response && err.response.data) {
    yield call(openNotification, { message: err.response.data.error });
  }
}

export function* retrieveList() {
  try {
    yield put({ type: START });
    const page = yield select(getPageNumber);
    const filters = yield select(getFilters);
    const queryString = stringify({ page, ...filters }, { skipNulls: true });
    const res = yield call(axios.get, `${url}?${queryString}`);
    yield put({ type: RETRIEVE_LIST_SUCCESS, users: res.data });
  } catch (err) {
    yield call(errorHandler, err);
  }
}

export function* retrieveOne({ userId }) {
  try {
    yield put({ type: START });
    const res = yield call(axios.get, `${url}/${userId}`);
    yield put({ type: RETRIEVE_ONE_SUCCESS, user: res.data });
  } catch (err) {
    yield call(errorHandler, err);
  }
}

export function* update({ user, userId }) {
  try {
    yield put({ type: START });
    yield call(axios.put, `${url}/${userId}`, user);
    yield put({ type: UPDATE_SUCCESS, user, userId });
    yield call(history.push, '/users');
    yield call(openNotification, { message: 'User saved successfully' });
  } catch (err) {
    yield call(errorHandler, err);
  }
}

export function* deleteUser({ userId }) {
  try {
    yield put({ type: START });
    yield call(axios.delete, `${url}/${userId}`);
    yield put({ type: DELETE_SUCCESS, userId });
  } catch (err) {
    yield call(errorHandler, err);
  }
}

export function* reload() {
  yield put({ type: RESET });
  yield call(retrieveList);
}


export default [
  takeLatest(RETRIEVE_LIST, retrieveList),
  takeLatest(RETRIEVE_ONE, retrieveOne),
  takeLatest(UPDATE, update),
  takeLatest(DELETE, deleteUser),
  takeLatest(RELOAD, reload),
];
