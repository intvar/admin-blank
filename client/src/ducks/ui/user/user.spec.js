import { Map } from 'immutable';
import axios from 'axios';
import { put, call } from 'redux-saga/effects';
import { openNotification } from '../notification';
import history from '../../../core/utils';
import reducer, {
  START,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  ERROR,
  signIn,
  signOut,
} from './index';

describe('user reducer', () => {
  describe('signin', () => {
    const initialState = Map({
      personalData: {
        first_name: null,
        last_name: null,
        email: null,
      },
      isAuthorized: false,
      isLoading: false,
      error: null,
    });

    const user = {
      id: 1,
      email: 'mickey@disney.com',
      first_name: 'Mickey',
      last_name: 'Mouse',
    };

    it('start', () => {
      const currentState = initialState.set('signInError', 'errorText');
      const nextState = reducer(currentState, { type: START });
      expect(nextState.get('isLoading')).toBeTruthy();
    });

    it('signin success', () => {
      const currentState = initialState.set('isLoading', true);
      const nextState = reducer(currentState, { type: SIGN_IN_SUCCESS, user });
      expect(nextState.get('isLoading')).toBeFalsy();
      expect(nextState.get('isAuthorized')).toBeTruthy();
      expect(nextState.get('personalData').toJS()).toEqual(user);
    });

    it('error', () => {
      const currentState = initialState.set('isLoading', true);
      const nextState = reducer(currentState, { type: ERROR });
      expect(nextState.get('isLoading')).toBeFalsy();
      expect(nextState.get('isAuthorized')).toBeFalsy();
    });
  });
  describe('signout', () => {
    const initialState = Map({
      personalData: {
        id: 1,
        first_name: 'Mickey',
        last_name: 'Mouse',
        email: 'mickey@disney.com',
      },
      isAuthorized: true,
      isLoading: false,
      error: null,
    });
    it('signout success', () => {
      const currentState = initialState.merge({
        isAuthorized: true,
        isLoading: true,
      });
      const nextState = reducer(currentState, { type: SIGN_OUT_SUCCESS });
      expect(nextState.get('isLoading')).toBeFalsy();
      expect(nextState.get('isAuthorized')).toBeFalsy();
      expect(nextState.get('personalData')).toBe(null);
    });
  });
});

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
    expect(iterator.next().value).toEqual(put({ type: START }));
    expect(iterator.next().value).toEqual(call(axios.put, url, inputData));
    expect(iterator.next(response).value)
      .toEqual(put({ type: SIGN_IN_SUCCESS, user: response.data }));
    expect(iterator.next().value).toEqual(call(history.push, '/')); //@ToDo move to callback
    expect(iterator.throw(err).value).toEqual(put({ type: ERROR }));
  });
  it('signOut', () => {
    const url = '/api/v1/actions/logout';
    const iterator = signOut();
    expect(iterator.next().value).toEqual(put({ type: START }));
    expect(iterator.next().value).toEqual(call(axios.put, url));
    expect(iterator.next().value).toEqual(put({ type: SIGN_OUT_SUCCESS }));
    expect(iterator.throw(err).value).toEqual(put({ type: ERROR }));
    expect(iterator.next().value).toEqual(call(openNotification, { message: 'Mickey mouse not found' }));
  });
});
