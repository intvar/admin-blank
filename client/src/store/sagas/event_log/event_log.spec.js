import axios from 'axios';
import { put, call, select } from 'redux-saga/effects';
import { loadEventLog, reloadEventLog } from './';
import { loadStart, loadSuccess, reset } from '../../ducks/data/event_log';
import { getPageNumber, getFilters } from '../../selectors/eventLogSelector';


describe('event log sagas', () => {
  const response = {
    data: [{
      id: 12,
      event_id: 'users_read',
    }, {
      id: 13,
      event_id: 'users_read',
    }],
  };
  it('load', () => {
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
});
