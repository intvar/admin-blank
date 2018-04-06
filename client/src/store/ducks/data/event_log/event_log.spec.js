import reducer, { loadStart, loadSuccess, reset, initialState } from './index2';

describe('event log reducer', () => {
  it('load start', () => {
    const nextState = reducer(initialState, loadStart());
    expect(nextState.get('isLoading')).toBeTruthy();
  });
});
