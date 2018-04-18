import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import {
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_ERROR,
} from '../../ducks/ui/user';
import { signIn, signOut } from './index';
import { openNotification } from '../notification';

describe('auth sagas', () => {
  const err = {
    response: {
      data: {
        error: 'Mickey mouse not found',
      },
    },
  };
  it('signIn', () => {
    const response = {
      data: {
        id: 1,
        email: 'mickey@disney.com',
        first_name: 'Mickey',
        last_name: 'Mouse',
      },
    };
    const url = '/api/v1/actions/login';
    const inputData = { email: 'mickey@disney.com', password: '*****' };

    const iterator = signIn(inputData);
    expect(iterator.next().value).toEqual(put({ type: SIGN_IN_START }));
    expect(iterator.next().value).toEqual(call(axios.put, url, inputData));
    expect(iterator.next(response).value)
      .toEqual(put({ type: SIGN_IN_SUCCESS, user: response.data }));
    expect(iterator.throw(err).value).toEqual(put({ type: SIGN_IN_ERROR, error: 'Mickey mouse not found' }));
  });
  it('signOut', () => {
    const url = '/api/v1/actions/logout';
    const iterator = signOut();
    expect(iterator.next().value).toEqual(put({ type: SIGN_OUT_START }));
    expect(iterator.next().value).toEqual(call(axios.put, url));
    expect(iterator.next().value).toEqual(put({ type: SIGN_OUT_SUCCESS }));
    expect(iterator.throw(err).value).toEqual(put({ type: SIGN_OUT_ERROR }));
    expect(iterator.next().value).toEqual(call(openNotification, { message: 'Mickey mouse not found' }));
  });
});
