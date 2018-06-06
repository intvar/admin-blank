import { Map, OrderedMap } from 'immutable';
import axios from 'axios';
import { put, call, select } from 'redux-saga/effects';
import reducer, { LOAD_START, LOAD_SUCCESS, RESET, LOAD_DEBUG_INFO_SUCCESS, initialState, loadEventLog, reloadEventLog, loadDebugInfo, errorHandler, getPageNumber, getFilters } from './index';

const event_logs = [{
  id: 11,
  event_id: 'users_list',
}, {
  id: 12,
  event_id: 'users_read',
}];

const event_logs_second = [{
  id: 12,
  event_id: 'users_read',
}, {
  id: 13,
  event_id: 'users_read',
}];

describe('event log reducer', () => {
  it('load start', () => {
    const nextState = reducer(initialState, { type: LOAD_START });
    expect(nextState.get('isLoading')).toBeTruthy();
  });
  describe('load success', () => {
    it('should load success for empty list', () => {
      const currentState = initialState.set('isLoading', true);
      const nextState = reducer(currentState, { type: LOAD_SUCCESS, event_logs });
      expect(nextState.get('isLoading')).toBeFalsy();
      expect(nextState.get('pageNumber')).toBe(2);
      expect(nextState.get('hasMore')).toBeFalsy();
      expect(nextState.get('list').toJS()).toEqual({
        11: {
          id: 11,
          event_id: 'users_list',
        },
        12: {
          id: 12,
          event_id: 'users_read',
        },
      });
    });
    it('should load success for not empty list', () => {
      const currentState = initialState.merge({
        isLoading: true,
        list: OrderedMap({
          11: {
            id: 11,
            event_id: 'users_list',
          },
          12: {
            id: 12,
            event_id: 'users_read',
          },
        }),
      });
      const nextState = reducer(currentState, {
        type: LOAD_SUCCESS,
        event_logs: event_logs_second,
      });
      expect(nextState.get('isLoading')).toBeFalsy();
      expect(nextState.get('pageNumber')).toBe(2);
      expect(nextState.get('hasMore')).toBeFalsy();
      expect(nextState.get('list').toJS()).toEqual({
        11: {
          id: 11,
          event_id: 'users_list',
        },
        12: {
          id: 12,
          event_id: 'users_read',
        },
        13: {
          id: 13,
          event_id: 'users_read',
        },
      });
    });
  });
  describe('load debug_info', () => {
    it('should add debug info', () => {
      const currentState = initialState.merge({
        isLoading: true,
        list: OrderedMap({
          11: {
            id: 11,
            event_id: 'users_list',
          },
        }),
      });
      const debug_info = { body: {}, params: { id: 9999 } };
      const nextState = reducer(currentState, {
        type: LOAD_DEBUG_INFO_SUCCESS,
        debug_info,
        event_log_id: 11,
      });
      expect(nextState.get('isLoading')).toBeFalsy();
      expect(nextState.get('list').size).toBe(1);
      expect(nextState.getIn(['list', '11'])).toEqual({
        id: 11,
        event_id: 'users_list',
        debug_info,
      });
    });
  });
  it('reset', () => {
    const currentState = Map({
      hasMore: false,
      pageNumber: 2,
      isLoading: false,
      list: OrderedMap({
        11: {
          id: 11,
          event_id: 'users_list',
        },
        12: {
          id: 12,
          event_id: 'users_read',
        },
      }),
    });
    const nextState = reducer(currentState, { type: RESET });
    expect(nextState.get('hasMore')).toBeTruthy();
    expect(nextState.get('pageNumber')).toBe(1);
    expect(nextState.get('isLoading')).toBeFalsy();
    expect(nextState.get('list').size).toBe(0);
  });
});

describe('event log sagas', () => {
  const err = {
    response: {
      error: 'error',
    },
  };
  it('load', () => {
    const response = {
      data: [{
        id: 12,
        event_id: 'users_read',
      }, {
        id: 13,
        event_id: 'users_read',
      }],
    };
    const url = '/api/v1/events?page=1&is_error=1';
    const iterator = loadEventLog();
    expect(iterator.next().value).toEqual(select(getPageNumber));
    expect(iterator.next(1).value).toEqual(select(getFilters));
    expect(iterator.next({ is_error: 1 }).value).toEqual(put({ type: LOAD_START }));
    expect(iterator.next().value).toEqual(call(axios.get, url));
    expect(iterator.next(response).value).toEqual(put({
      type: LOAD_SUCCESS,
      event_logs: response.data,
    }));
  });

  it('reload', () => {
    const iterator = reloadEventLog();
    expect(iterator.next().value).toEqual(put({ type: RESET }));
    expect(iterator.next().value).toEqual(call(loadEventLog));
  });

  it('load debug info', () => {
    const debug_info = { body: {}, params: { id: 9999 } };
    const url = '/api/v1/events/42/debug_info';
    const response = { data: debug_info };
    const iterator = loadDebugInfo({ event_log_id: 42 });
    expect(iterator.next().value).toEqual(put({ type: LOAD_START }));
    expect(iterator.next().value).toEqual(call(axios.get, url));
    expect(iterator.next(response).value).toEqual(put({
      type: LOAD_DEBUG_INFO_SUCCESS,
      debug_info,
      event_log_id: 42,
    }));
    expect(iterator.throw(err).value).toEqual(call(errorHandler, err));
  });
});
