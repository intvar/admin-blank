import axios from 'axios';
import { call, put, select } from 'redux-saga/effects';
import { create, retrieveList, retrieveOne, update, deleteUser, errorHandler } from './index';
import {
  START,
  CREATE_SUCCESS,
  RETRIEVE_LIST_SUCCESS,
  RETRIEVE_ONE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
  ERROR,
} from '../../ducks/data/users';
import { openNotification } from '../notification';
import { getPageNumber } from '../../selectors/usersSelector';

const users = [{
  id: 1,
  status: 0,
  first_name: 'Jack',
  last_name: 'Daniels',
  email: 'jack@gmail.com',
}, {
  id: 2,
  status: 2,
  first_name: 'Ronald',
  last_name: 'Reed',
  email: 'ronald@admin.com',
}];

const user = users[1];
const { id, ...userWithoutId } = user;

describe('users sagas', () => {
  const err = {
    data: {
      error: 'error text',
    },
  };
  it('error handler', () => {
    const iterator = errorHandler(err);
    expect(iterator.next().value).toEqual(put({ type: ERROR }));
    expect(iterator.next().value).toEqual(call(openNotification, err.data.error));
  });
  it('create', () => {
    const iterator = create({ user: userWithoutId });
    expect(iterator.next().value).toEqual(put({ type: START }));
    expect(iterator.next().value).toEqual(call(axios.post, '/api/v1/users', userWithoutId));
    expect(iterator.next({ data: { id } }).value)
      .toEqual(put({ type: CREATE_SUCCESS, user }));
    expect(iterator.throw(err).value).toEqual(call(errorHandler, err));
  });
  it('retrieve list', () => {
    const iterator = retrieveList();
    expect(iterator.next().value).toEqual(put({ type: START }));
    expect(iterator.next().value).toEqual(select(getPageNumber));
    expect(iterator.next(1).value).toEqual(call(axios.get, '/api/v1/users?page=1'));
    expect(iterator.next({ data: users }).value)
      .toEqual(put({ type: RETRIEVE_LIST_SUCCESS, users }));
    expect(iterator.throw(err).value).toEqual(call(errorHandler, err));
  });
  it('retrieve one', () => {
    const iterator = retrieveOne({ userId: id });
    expect(iterator.next().value).toEqual(put({ type: START }));
    expect(iterator.next().value).toEqual(call(axios.get, '/api/v1/users/2'));
    expect(iterator.next({ data: user }).value)
      .toEqual(put({ type: RETRIEVE_ONE_SUCCESS, user }));
    expect(iterator.throw(err).value).toEqual(call(errorHandler, err));
  });
  it('update', () => {
    const iterator = update({ user: userWithoutId, userId: id });
    expect(iterator.next().value).toEqual(put({ type: START }));
    expect(iterator.next().value).toEqual(call(axios.put, '/api/v1/users/2', userWithoutId));
    expect(iterator.next().value)
      .toEqual(put({ type: UPDATE_SUCCESS, user: userWithoutId, userId: id }));
    expect(iterator.throw(err).value).toEqual(call(errorHandler, err));
  });
  it('delete', () => {
    const iterator = deleteUser({ userId: id });
    expect(iterator.next().value).toEqual(put({ type: START }));
    expect(iterator.next().value).toEqual(call(axios.delete, '/api/v1/users/2'));
    expect(iterator.next().value)
      .toEqual(put({ type: DELETE_SUCCESS, userId: id }));
    expect(iterator.throw(err).value).toEqual(call(errorHandler, err));
  });
});
