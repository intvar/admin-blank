import { Map } from 'immutable';
import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';
import { appName } from '../../config';

export const moduleName = 'notification';
const prefix = `${appName}/${moduleName}`;

export const OPEN_NOTIFICATION = `${prefix}/OPEN_NOTIFICATION`;
export const OPEN = `${prefix}/OPEN`;
export const HIDE = `${prefix}/HIDE`;

const initialState = Map({
  message: '',
  open: false,
  autoHideDuration: 4000,
});

export default (state = initialState, action) => {
  const { type, message, autoHideDuration } = action;

  switch (type) {
    case OPEN:
      return state.merge(new Map({ message, open: true, autoHideDuration }));
    case HIDE:
      return state.set('open', false);

    default:
      return state;
  }
};

export function* openNotification({ message, autoHideDuration = 4000 }) {
  yield put({
    type: OPEN,
    message,
    autoHideDuration,
  });
  yield call(delay, autoHideDuration);
  yield put({ type: HIDE });
}

export const saga = takeEvery(OPEN_NOTIFICATION, openNotification);
