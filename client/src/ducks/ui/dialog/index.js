import { Map } from 'immutable';
import React from 'react';
import { put, call, takeLatest } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import buttonCreater from './buttonCreater';

export const SHOW = 'dialog/SHOW';
export const HIDE = 'dialog/HIDE';
export const ASK_QUESTION = 'dialog/ASK_QUESTION';

const initialState = Map({
  dialogProperties: null,
  component: null,
  componentProperties: null,
});

export default function dialog(state = initialState, {
  type,
  dialogProperties,
  component,
  componentProperties,
}) {
  switch (type) {
    case SHOW:
      return state.merge({
        dialogProperties,
        component,
        componentProperties,
      });
    case HIDE:
      return initialState;
    default:
      return state;
  }
}

export const dialogSelector = createSelector(
  state => state.ui.dialog,
  immutableMap => immutableMap.toJS(),
);

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

export function* showComponent({
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

export function* showInfo({
  title,
  message,
}) {
  const HideButton = buttonCreater({ type: HIDE });
  const dialogProperties = {
    title,
    actions: [React.createElement(HideButton, { label: 'hide' })],
  };
  const component = () => React.createElement('div', null, message);
  yield call(showDialog, { dialogProperties, component });
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

export const sagas = [
  takeLatest(ASK_QUESTION, askQuestions),
];
