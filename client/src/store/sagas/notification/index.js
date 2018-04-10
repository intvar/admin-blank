import { delay } from 'redux-saga';
import { put, call, takeEvery } from 'redux-saga/effects';
import { OPEN, HIDE, OPEN_NOTIFICATION } from '../../ducks/ui/notification';

export function* openNotification({ message, autoHideDuration = 4000 }) {
  yield put({
    type: OPEN,
    message,
    autoHideDuration,
  });
  yield call(delay, autoHideDuration);
  yield put({ type: HIDE });
}

export default takeEvery(OPEN_NOTIFICATION, openNotification);
