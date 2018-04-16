import axios from 'axios';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import urlJoin from 'url-join';
import { stringify } from 'qs';
import { API_URL } from '../../../core/constants';
import {
  START,
  RETRIEVE_LIST,
  RETRIEVE_LIST_SUCCESS,
  RETRIEVE_ONE,
  RETRIEVE_ONE_SUCCESS,
  UPDATE,
  UPDATE_SUCCESS,
  DELETE,
  DELETE_SUCCESS,
  ERROR,
} from '../../ducks/data/users';
import { openNotification } from '../notification';
import { getPageNumber } from '../../selectors/usersSelector';
import history from '../../../core/utils';
import { askQuestions } from '../dialog';

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
    const queryString = stringify({ page });
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

export default [
  takeLatest(RETRIEVE_LIST, retrieveList),
  takeLatest(RETRIEVE_ONE, retrieveOne),
  takeLatest(UPDATE, update),
  takeLatest(DELETE, deleteUser),
];
