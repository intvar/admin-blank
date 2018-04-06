import reducer, { initialState, loadStart, loadFinish, loadError } from './index';

const event_codes = [
  'code1',
  'code2',
  'code3',
];

describe('event codes reducer', () => {
  it('start load event codes', () => {
    const nextState = reducer(initialState, loadStart());
    expect(nextState.get('isLoading')).toBeTruthy();
  });
  it('success load event codes', () => {
    const currentState = initialState.set('isLoading', true);
    const nextState = reducer(currentState, loadFinish(event_codes));
    expect(nextState.get('isLoading')).toBeFalsy();
    expect(nextState.get('list').toJS()).toEqual(event_codes);
  });
  it('error load event codes', () => {
    const nextState = reducer(initialState, loadError());
    expect(nextState.get('isLoading')).toBeFalsy();
  });
});
