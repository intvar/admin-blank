import { put, call } from 'redux-saga/effects';
import axios from 'axios';
import { loadEventCodes } from './index';
import {
  LOAD_START,
  LOAD_FINISH,
  LOAD_ERROR,
} from '../../ducks/data/event_codes';

describe('event codes sagas', () => {
  const event_codes = ['admin_event_codes_list', 'login'];
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
  // const err = {
  //   response: {
  //     data: {
  //       error: 'Not Authorized',
  //     },
  //   },
  // };
  it('load', () => {
    const iterator = loadEventCodes();
    expect(iterator.next().value).toEqual(put({ type: LOAD_START }));
    expect(iterator.next().value).toEqual(call(axios.get, url));
    expect(iterator.next(response).value).toEqual(put({ type: LOAD_FINISH, event_codes }));
    expect(iterator.throw().value).toEqual(put({ type: LOAD_ERROR }));
  });
});
