import { Map } from 'immutable';
import reducer, {
  signInStart,
  signInSuccess,
  signInError,
  signOutStart,
  signOutSuccess,
  signOutError,
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

    it('signin start', () => {
      const currentState = initialState.set('error', 'errorText');
      const nextState = reducer(currentState, signInStart());
      expect(nextState.get('isLoading')).toBeTruthy();
      expect(nextState.get('error')).toBe(null);
    });

    it('signin success', () => {
      const currentState = initialState.set('isLoading', true);
      const nextState = reducer(currentState, signInSuccess(user));
      expect(nextState.get('isLoading')).toBeFalsy();
      expect(nextState.get('isAuthorized')).toBeTruthy();
      expect(nextState.get('personalData').toJS()).toEqual(user);
    });

    it('signin error', () => {
      const currentState = initialState.set('isLoading', true);
      const nextState = reducer(currentState, signInError('error text'));
      expect(nextState.get('isLoading')).toBeFalsy();
      expect(nextState.get('isAuthorized')).toBeFalsy();
      expect(nextState.get('error')).toBe('error text');
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
    it('signout start', () => {
      const nextState = reducer(initialState, signOutStart());
      expect(nextState.get('isLoading')).toBeTruthy();
      expect(nextState.get('isAuthorized')).toBeTruthy();
    });
    it('signout success', () => {
      const currentState = initialState.merge({
        isAuthorized: true,
        isLoading: true,
      });
      const nextState = reducer(currentState, signOutSuccess());
      expect(nextState.get('isLoading')).toBeFalsy();
      expect(nextState.get('isAuthorized')).toBeFalsy();
      expect(nextState.get('personalData')).toBe(null);
    });
    it('signout error', () => {
      const currentState = initialState.set('isAuthorized', true);
      const nextState = reducer(currentState, signOutError('error text'));
      expect(nextState.get('isLoading')).toBeFalsy();
      expect(nextState.get('isAuthorized')).toBeTruthy();
      expect(nextState.get('error')).toBe('error text');
    });
  });
});
