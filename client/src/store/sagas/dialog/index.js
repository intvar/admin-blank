import React from 'react';
import { put, call } from 'redux-saga/effects';
import { SHOW, HIDE } from '../../ducks/ui/dialog';
import buttonCreater from './buttonCreater';

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
  const HideButton = buttonCreater(HIDE);
  const dialogProperties = {
    title,
    modal: false,
    actions: [React.createElement(HideButton, { label: 'hide' })],
  };
  yield call(showDialog, { dialogProperties, component, componentProperties });
}
