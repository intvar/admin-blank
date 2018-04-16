import React from 'react';
import { put, call, takeLatest } from 'redux-saga/effects';
import { SHOW, HIDE } from '../../ducks/ui/dialog';
import buttonCreater from './buttonCreater';

export const ASK_QUESTION = 'dialog/ASK_QUESTION';

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

export function* showInfo({
  title,
  component,
  componentProperties,
}) {
  const HideButton = buttonCreater({ type: HIDE });
  const dialogProperties = {
    title,
    modal: false,
    actions: [React.createElement(HideButton, { label: 'hide' })],
  };
  yield call(showDialog, { dialogProperties, component, componentProperties });
}

export function* askQuestions({
  title,
  question,
  closeButtonLabel = 'cancel',
  acceptButtonLabel = 'ok',
  action,
}) {
  const CancelButton = buttonCreater({ type: HIDE });
  const AcceptButton = buttonCreater([action, { type: HIDE }]);
  const actions = [
    React.createElement(AcceptButton, { label: acceptButtonLabel }),
    React.createElement(CancelButton, { label: closeButtonLabel, primary: false }),
  ];
  const component = () => question;
  const dialogProperties = {
    title,
    component,
    actions,
  };
  yield call(showDialog, {
    dialogProperties,
    component,
  });
}

export default [
  takeLatest(ASK_QUESTION, askQuestions),
];
