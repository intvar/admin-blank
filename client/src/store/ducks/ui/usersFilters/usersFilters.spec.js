import { Map } from 'immutable';
import reducer, { initialState, searchCriterionChange, statusChange, kycStatusChange, resetFilters } from './index';

describe('users filters reducer', () => {
  it('should update search criterion', () => {
    const value = 'test_value';
    const nextState = reducer(initialState, searchCriterionChange(value));
    expect(nextState.get('search_criterion')).toBe(value);
  });

  it('should update status', () => {
    const value = 1;
    const nextState = reducer(initialState, statusChange(value));
    expect(nextState.get('status')).toBe(value);
  });

  it('should update kyc_status', () => {
    const value = 0;
    const nextState = reducer(initialState, kycStatusChange(value));
    expect(nextState.get('kyc_status')).toBe(value);
  });

  it('should reset filters', () => {
    const currentState = Map({
      kyc_status: 1,
      status: 0,
      search_criterion: 'test_value',
    });
    const nextState = reducer(currentState, resetFilters());
    expect(nextState).toEqual(initialState);
  });
});
