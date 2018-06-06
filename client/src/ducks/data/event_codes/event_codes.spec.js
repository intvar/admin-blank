import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import reducer, { initialState, LOAD_START, LOAD_FINISH, LOAD_ERROR, loadEventCodes } from './index';

const event_codes = [
  'code1',
  'code2',
  'code3',
];

describe('event codes reducer', () => {
  it('start load event codes', () => {
    const nextState = reducer(initialState, { type: LOAD_START });
    expect(nextState.get('isLoading')).toBeTruthy();
  });
  it('success load event codes', () => {
    const currentState = initialState.set('isLoading', true);
    const nextState = reducer(currentState, { type: LOAD_FINISH, event_codes });
    expect(nextState.get('isLoading')).toBeFalsy();
    expect(nextState.get('list').toJS()).toEqual(event_codes);
  });
  it('error load event codes', () => {
    const nextState = reducer(initialState, { type: LOAD_ERROR });
    expect(nextState.get('isLoading')).toBeFalsy();
  });
});

describe('event codes sagas', () => {
  const codes = ['admin_event_codes_list', 'login'];
  const url = '/api/v1/event_codes';
  const response = {
    data: [
      {
        id: 'admin_event_codes_list',
        description: null,
      },
      {
        id: 'login',
        description: null,
      },
    ],
  };
  it('load', () => {
    const iterator = loadEventCodes();
    expect(iterator.next().value).toEqual(put({ type: LOAD_START }));
    expect(iterator.next().value).toEqual(call(axios.get, url));
    expect(iterator.next(response).value).toEqual(put({ type: LOAD_FINISH, event_codes: codes }));
    expect(iterator.throw().value).toEqual(put({ type: LOAD_ERROR }));
  });
});

