import { put, call } from 'redux-saga/effects';
import { SHOW, HIDE } from '../../ducks/ui/dialog';

export function* showDialog({
  dialogProperties,
  component,
  componentProperties,
}) {
  yield put({
    type: SHOW,
    dialogProperties,
    component,
    componentProperties,
  });
}

export function* showModal({
  title,
  component,
  componentProperties,
}) {
  const dialogProperties = {
    title,
    modal: false,
  };
  yield call(showDialog, { dialogProperties, component, componentProperties });
}
