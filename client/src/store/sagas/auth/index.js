import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import urlJoin from 'url-join';
import history from '../../../core/utils';
import { API_URL } from '../../../core/constants';
import {
  SIGN_IN,
  signInStart,
  signInSuccess,
  signInError,
  SIGN_OUT,
  signOutStart,
  signOutSuccess,
  signOutError,
} from '../../ducks/data/user';

export function* signIn({ email, password }) {
  const url = urlJoin(API_URL, '/actions/login');
  try {
    yield put(signInStart());
    const res = yield call(axios.put, url, { email, password });
    yield put(signInSuccess(res.data));
    history.push('/');
  } catch (err) {
    yield put(signInError(err.response.data.error));
  }
}

export function* signOut() {
  const url = urlJoin(API_URL, '/actions/logout');
  try {
    yield put(signOutStart());
    yield call(axios.put, url);
    yield put(signOutSuccess());
    history.push('/signin');
  } catch (err) {
    yield put(signOutError(err.response.data.error));
  }
}


export default [
  takeEvery(SIGN_IN, signIn),
  takeEvery(SIGN_OUT, signOut),
];

// export function signUp({ first_name, last_name, email }) {
//   return (dispatch, getState, fetch) => {
//     dispatch(loadStart());

//     fetch(urlJoin(API_URL, '/users'), {
//       method: 'POST',
//       body: JSON.stringify({ first_name, last_name, email }),
//     })
//       .then(() => {
//         dispatch(loadEnd());
//         dispatch(openNotification({
//           message: REGISTRATION_MESSAGE,
//         }));
//       })
//       .catch(() => {
//         dispatch(loadEnd());
//       });
//   };
// }

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