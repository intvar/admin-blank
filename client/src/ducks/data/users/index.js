import { Map } from 'immutable';
import mapKeys from 'lodash/mapKeys';
import axios from 'axios';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import urlJoin from 'url-join';
import { stringify } from 'qs';
import { createSelector } from 'reselect';
import { API_URL } from '../../../core/constants';
import { openNotification } from '../../ui/notification';
import history from '../../../core/utils';

const limit = 20;

export const initialState = Map({
  list: Map(),
  pageNumber: 1,
  hasMore: true,
  isLoading: false,
});

export const RETRIEVE_LIST = '/users/RETRIEVE_LIST';
export const RETRIEVE_ONE = '/users/RETRIEVE_ONE';
export const UPDATE = '/users/UPDATE';
export const DELETE = '/users/DELETE';
export const RELOAD = '/users/RELOAD';
export const START = '/users/START';
export const RETRIEVE_LIST_SUCCESS = '/users/RETRIEVE_LIST_SUCCESS';
export const RETRIEVE_ONE_SUCCESS = '/users/RETRIEVE_ONE_SUCCESS';
export const UPDATE_SUCCESS = '/users/UPDATE_SUCCESS';
export const DELETE_SUCCESS = '/users/DELETE_SUCCESS';
export const ERROR = '/users/ERROR';
export const RESET = '/users/RESET';

export default (
  state = initialState,
  {
    type,
    user,
    users,
    userId,
  },
) => {
  const userIdStr = String(userId);
  switch (type) {
    case START:
      return state.set('isLoading', true);
    case RETRIEVE_ONE_SUCCESS:
      return state.merge({
        isLoading: false,
        list: state.get('list').merge({ [user.id]: user }),
      });
    case RETRIEVE_LIST_SUCCESS:
      return state.merge({
        isLoading: false,
        list: state.get('list').merge(mapKeys(users, 'id')),
        pageNumber: state.get('pageNumber') + 1,
        hasMore: (users.length === limit),
      });
    case UPDATE_SUCCESS:
      return state.updateIn(['list', userIdStr], u => u.merge(user)).set('isLoading', false);
    case DELETE_SUCCESS:
      return state.deleteIn(['list', userIdStr]).set('isLoading', false);
    case ERROR:
      return state.set('isLoading', false);
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export const usersSelector = createSelector(state => state.data.users, users => users);

export const getPageNumber = createSelector(
  state => state.data.users,
  users => users.get('pageNumber'),
);

export const getList = createSelector(
  state => state.data.users,
  users => users.get('list'),
);

export const getFilters = createSelector(
  state => state.form.usersFilters,
  usersFilters => usersFilters.values,
);


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
    yield call(history.push, '/users'); //@ToDo перенести в callback
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


export const sagas = [
  takeLatest(RETRIEVE_LIST, retrieveList),
  takeLatest(RETRIEVE_ONE, retrieveOne),
  takeLatest(UPDATE, update),
  takeLatest(DELETE, deleteUser),
  takeLatest(RELOAD, reload),
];
