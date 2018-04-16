import axios from 'axios';
import { put, call, select } from 'redux-saga/effects';
import { loadEventLog, reloadEventLog, loadDebugInfo, errorHandler } from './';
import { loadStart, loadSuccess, reset, LOAD_START, LOAD_DEBUG_INFO_SUCCESS } from '../../ducks/data/event_log';
import { getPageNumber, getFilters } from '../../selectors/eventLogSelector';

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
    expect(iterator.next({ is_error: 1 }).value).toEqual(put(loadStart()));
    expect(iterator.next().value).toEqual(call(axios.get, url));
    expect(iterator.next(response).value).toEqual(put(loadSuccess(response.data)));
  });

  it('reload', () => {
    const iterator = reloadEventLog();
    expect(iterator.next().value).toEqual(put(reset()));
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
