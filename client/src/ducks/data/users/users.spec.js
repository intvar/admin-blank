import reducer, {
  START,
  RETRIEVE_LIST_SUCCESS,
  RETRIEVE_ONE_SUCCESS,
  UPDATE_SUCCESS,
  DELETE_SUCCESS,
  ERROR,
  initialState,
} from './index';

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


describe('users reducer', () => {
  it('start', () => {
    const nextState = reducer(initialState, { type: START });
    expect(nextState.get('isLoading')).toBeTruthy();
  });
  it('retrieve list', () => {
    const currentState = initialState.set('isLoading', true);
    const nextState = reducer(currentState, { type: RETRIEVE_LIST_SUCCESS, users });
    expect(nextState.get('isLoading')).toBeFalsy();
    expect(nextState.get('list').toJS()).toEqual({ 1: users[0], 2: users[1] });
    expect(nextState.get('pageNumber')).toEqual(2);
    expect(nextState.get('hasMore')).toBeFalsy();
  });
  it('retrieve one', () => {
    const currentState = initialState.set('isLoading', true);
    const nextState = reducer(currentState, { type: RETRIEVE_ONE_SUCCESS, user });
    expect(nextState.get('isLoading')).toBeFalsy();
    expect(nextState.get('list').toJS()).toEqual({ 2: user });
  });
  it('update', () => {
    const currentState = initialState.merge({
      isLoading: true,
      list: { 1: users[0], 2: users[1] },
    });
    const nextState = reducer(currentState, {
      type: UPDATE_SUCCESS,
      user: { first_name: 'Jhon' },
      userId: 1,
    });
    expect(nextState.get('isLoading')).toBeFalsy();
    expect(nextState.get('list').size).toBe(2);
    expect(nextState.getIn(['list', '1']).toJS()).toEqual({
      id: 1,
      status: 0,
      first_name: 'Jhon',
      last_name: 'Daniels',
      email: 'jack@gmail.com',
    });
  });
  it('delete', () => {
    const currentState = initialState.merge({
      isLoading: true,
      list: { 1: users[0], 2: users[1] },
    });
    const nextState = reducer(currentState, {
      type: DELETE_SUCCESS,
      userId: 1,
    });
    expect(nextState.get('isLoading')).toBeFalsy();
    expect(nextState.get('list').toJS()).toEqual({ 2: users[1] });
  });
  it('error', () => {
    const currentState = initialState.set('isLoading', true);
    const nextState = reducer(currentState, { type: ERROR });
    expect(nextState.get('isLoading')).toBeFalsy();
  });
});
