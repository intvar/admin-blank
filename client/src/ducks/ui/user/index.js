import { Map } from 'immutable';
import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import urlJoin from 'url-join';
import { createSelector } from 'reselect';
import history from '../../../core/utils';
import { API_URL } from '../../../core/constants';
import { openNotification } from '../notification';
import { showInfo } from '../dialog';
import { appName } from '../../../config';

export const moduleName = 'user';
const prefix = `${appName}/${moduleName}`;

export const SIGN_IN = `${prefix}/SIGN_IN`;
export const SIGN_OUT = `${prefix}/SIGN_OUT`;
export const FORGOT_PASSWORD = `${prefix}/FORGOT_PASSWORD`;
export const RECOVERY_PASSWORD = `${prefix}/RECOVERY_PASSWORD`;
export const CHANGE_PASSWORD = `${prefix}/CHANGE_PASSWORD`;
export const START = `${prefix}/START`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`;
export const PASSWORD_RESTORED = `${prefix}/PASSWORD_RESTORED`;
export const FINISH = `${prefix}/FINISH`;
export const ERROR = `${prefix}/ERROR`;

const initialUserState = Map({
  personalData: {
    first_name: null,
    last_name: null,
    email: null,
  },
  isAuthorized: false,
  isLoading: false,
});

export default function user(state = initialUserState, action) {
  switch (action.type) {
    case START:
      return state.set('isLoading', true);
    case FINISH:
    case ERROR:
      return state.set('isLoading', false);
    case SIGN_IN_SUCCESS:
      return state.merge({
        isAuthorized: true,
        isLoading: false,
        personalData: action.user,
      });
    case SIGN_OUT_SUCCESS:
      return state.merge({
        isAuthorized: false,
        isLoading: false,
        personalData: null,
      });
    case PASSWORD_RESTORED:
      return state.set('isAuthorized', true);
    default:
      return state;
  }
}

export const userSelector = createSelector(state => state.ui[moduleName], u => u.toJS());

export function* signIn({ email, password }) {
  const url = urlJoin(API_URL, '/actions/login');
  try {
    yield put({ type: START });
    const res = yield call(axios.put, url, { email, password });
    yield put({ type: SIGN_IN_SUCCESS, user: res.data });
    yield call(history.push, '/'); //@ToDo move to callback
  } catch (err) {
    yield put({ type: ERROR });
    if (err && err.response && err.response.data) {
      yield call(showInfo, { title: 'authentication error', message: err.response.data.error });
    }
  }
}

export function* signOut() {
  const url = urlJoin(API_URL, '/actions/logout');
  try {
    yield put({ type: START });
    yield call(axios.put, url);
    yield put({ type: SIGN_OUT_SUCCESS });
    history.push('/signin');
  } catch (err) {
    yield put({ type: ERROR });
    if (err && err.response && err.response.data) {
      yield call(openNotification, { message: err.response.data.error });
    }
  }
}

export function* forgotPassword({ email }) {
  const url = urlJoin(API_URL, '/actions/forgot_password');
  try {
    yield put({ type: START });
    yield call(axios.put, url, { email });
    yield put({ type: FINISH });
    yield call(showInfo, {
      title: 'Forgot password',
      message: 'An email with further instructions has been sent to your e-mail!',
    });
  } catch (err) {
    yield put({ type: ERROR });
    if (err && err.response && err.response.data) {
      yield call(showInfo, { title: 'Forgot password', message: err.response.data.error });
    }
  }
}

export function* recoveryPassword({ password, verify_pass_code }) {
  const url = urlJoin(API_URL, '/actions/recovery_password');
  try {
    yield put({ type: START });
    yield call(axios.put, url, { password, verify_pass_code });
    yield put({ type: SIGN_IN_SUCCESS });
    yield call(history.push, '/');
  } catch (err) {
    yield put({ type: ERROR });
    if (err && err.response && err.response.data) {
      yield call(showInfo, { title: 'Recovery password', message: err.response.data.error });
    }
  }
}

export function* changePassword({ old_password, new_password }) {
  const url = urlJoin(API_URL, '/actions/change_password');
  try {
    yield put({ type: START });
    yield call(axios.put, url, { old_password, new_password });
    yield put({ type: FINISH });
  } catch (err) {
    yield put({ type: ERROR });
    if (err && err.response && err.response.data) {
      yield call(showInfo, { title: 'Change password', message: err.response.data.error });
    }
  }
}

export const sagas = [
  takeEvery(SIGN_IN, signIn),
  takeEvery(SIGN_OUT, signOut),
  takeEvery(FORGOT_PASSWORD, forgotPassword),
  takeEvery(RECOVERY_PASSWORD, recoveryPassword),
  takeEvery(CHANGE_PASSWORD, changePassword),
];
