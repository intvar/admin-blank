import reducer, { initialState, LOAD_START, LOAD_FINISH, LOAD_ERROR } from './index';

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
