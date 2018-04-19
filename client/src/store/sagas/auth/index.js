import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import urlJoin from 'url-join';
import history from '../../../core/utils';
import { API_URL } from '../../../core/constants';
import { openNotification } from '../notification';
import { showInfo } from '../dialog';
import {
  START,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  FORGOT_PASSWORD_EMAIL_SEND,
  ERROR,
} from '../../ducks/ui/user';

export const SIGN_IN = 'auth/SIGN_IN';
export const SIGN_OUT = 'auth/SIGN_OUT';
export const FORGOT_PASSWORD = 'auth/FORGOT_PASSWORD';
export const RECOVERY_PASSWORD = 'auth/RECOVERY_PASSWORD';

export function* signIn({ email, password }) {
  const url = urlJoin(API_URL, '/actions/login');
  try {
    yield put({ type: START });
    const res = yield call(axios.put, url, { email, password });
    yield put({ type: SIGN_IN_SUCCESS, user: res.data });
    yield call(history.push, '/');
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
    yield put({ type: FORGOT_PASSWORD_EMAIL_SEND });
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

export default [
  takeEvery(SIGN_IN, signIn),
  takeEvery(SIGN_OUT, signOut),
  takeEvery(FORGOT_PASSWORD, forgotPassword),
  takeEvery(RECOVERY_PASSWORD, recoveryPassword),
];
