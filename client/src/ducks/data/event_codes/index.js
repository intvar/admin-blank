import { List, Map } from 'immutable';
import { put, call, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import urlJoin from 'url-join';
import { createSelector } from 'reselect';
import { API_URL } from '../../../core/constants';

export const LOAD = 'event_codes/LOAD';
export const LOAD_START = 'event_codes/LOAD_START';
export const LOAD_FINISH = 'event_codes/LOAD_FINISH';
export const LOAD_ERROR = 'event_codes/LOAD_ERROR';

export const initialState = Map({
  isLoading: false,
  list: List(),
});

export default (state = initialState, { type, event_codes }) => {
  switch (type) {
    case LOAD_START:
      return state.set('isLoading', true);
    case LOAD_FINISH:
      return state.merge({
        isLoading: false,
        list: List(event_codes),
      });
    case LOAD_ERROR:
      return state.set('isLoading', false);
    default:
      return state;
  }
};

export const eventCodesSelector = createSelector(
  state => state.data.event_codes,
  event_codes => event_codes.toJS().list,
);

export function* loadEventCodes() {
  const getId = eventCode => eventCode.id;
  try {
    const url = urlJoin(API_URL, '/event_codes');
    yield put({ type: LOAD_START });
    const res = yield call(axios.get, url);
    yield put({ type: LOAD_FINISH, event_codes: res.data.map(getId) });
  } catch (err) {
    yield put({ type: LOAD_ERROR });
  }
}

export const saga = takeEvery(LOAD, loadEventCodes);
