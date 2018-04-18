import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import urlJoin from 'url-join';
import history from '../../../core/utils';
import { API_URL } from '../../../core/constants';
import { openNotification } from '../notification';
import {
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
} from '../../ducks/ui/user';

export const SIGN_IN = 'auth/SIGN_IN';
export const SIGN_OUT = 'auth/SIGN_OUT';

export function* signIn({ email, password }) {
  const url = urlJoin(API_URL, '/actions/login');
  try {
    yield put({ type: SIGN_IN_START });
    const res = yield call(axios.put, url, { email, password });
    yield put({ type: SIGN_IN_SUCCESS, user: res.data });
    history.push('/');
  } catch (err) {
    yield put({ type: SIGN_IN_ERROR, error: err.response.data.error });
  }
}

export function* signOut() {
  const url = urlJoin(API_URL, '/actions/logout');
  try {
    yield put({ type: SIGN_OUT_START });
    yield call(axios.put, url);
    yield put({ type: SIGN_OUT_SUCCESS });
    history.push('/signin');
  } catch (err) {
    yield put({ type: SIGN_OUT_ERROR });
    if (err && err.response && err.response.data) {
      yield call(openNotification, { message: err.response.data.error });
    }
  }
}


export default [
  takeEvery(SIGN_IN, signIn),
  takeEvery(SIGN_OUT, signOut),
];

// export function recoverPassword({ email }) {
//   return (dispatch, getState, fetch) => {
//     dispatch(loadStart());

//     fetch(urlJoin(API_URL, '/actions/forgot_password'), {
//       method: 'PUT',
//       body: JSON.stringify({ email }),
//     })
//       .then(() => {
//         dispatch(loadEnd());

//         dispatch(openNotification({
//           message: RECOVER_MESSAGE_SENT_MESSAGE,
//         }));
//       })
//       .catch(() => {
//         dispatch(loadEnd());
//       });
//   };
// }


// export function restorePassword({ password, verify_pass_code }) {
//   return (dispatch, getState, fetch) => {
//     dispatch(loadStart());

//     fetch(urlJoin(API_URL, '/actions/recovery_password'), {
//       method: 'PUT',
//       body: JSON.stringify({ password, verify_pass_code }),
//     })
//       .then(() => {
//         dispatch(loadEnd());
//         dispatch(passwordRestored());
//         history.push('/');
//         dispatch(openNotification({ message: PASSWORD_RESTORED_MESSAGE }));
//       })
//       .catch(() => {
//         dispatch(loadEnd());
//       });
//   };
// }