import { Map } from 'immutable';
import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';

export const OPEN_NOTIFICATION = 'notification/OPEN_NOTIFICATION';
export const OPEN = 'notification/OPEN';
export const HIDE = 'notification/HIDE';

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
