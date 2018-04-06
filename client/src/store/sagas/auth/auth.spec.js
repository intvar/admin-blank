import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import {
  signInStart,
  signInSuccess,
  signInError,
  signOutStart,
  signOutSuccess,
  signOutError,
} from '../../ducks/data/user';
import { signIn, signOut } from './index';

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
    expect(iterator.next().value).toEqual(put(signInStart()));
    expect(iterator.next().value).toEqual(call(axios.put, url, inputData));
    expect(iterator.next(response).value).toEqual(put(signInSuccess(response.data)));
    expect(iterator.throw(err).value).toEqual(put(signInError('Mickey mouse not found')));
  });
  it('signOut', () => {
    const url = '/api/v1/actions/logout';
    const iterator = signOut();
    expect(iterator.next().value).toEqual(put(signOutStart()));
    expect(iterator.next().value).toEqual(call(axios.put, url));
    expect(iterator.next().value).toEqual(put(signOutSuccess()));
    expect(iterator.throw(err).value).toEqual(put(signOutError('Mickey mouse not found')));
  });
});
