import { all } from 'redux-saga/effects';
import { sagas as authSagas } from '../ducks/ui/user';
import { saga as eventCodes } from '../ducks/data/event_codes';
import { sagas as eventLog } from '../ducks/data/event_log';
import { sagas as users } from '../ducks/data/users';
import { sagas as admins } from '../ducks/data/admins';
import { sagas as dialog } from '../ducks/ui/dialog';
import { saga as notification } from '../ducks/ui/notification';

export default function* rootSaga() {
  yield all([
    ...authSagas,
    ...eventLog,
    ...users,
    ...admins,
    ...dialog,
    eventCodes,
    notification,
  ]);
}
