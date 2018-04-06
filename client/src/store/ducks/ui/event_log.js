import urlJoin from 'url-join';
import { List, Map } from 'immutable';
import { API_URL } from '../../../core/constants';

const initialState = Map({
  is_error: null,
  event_date_from: null,
  event_date_to: null,
  codes: List(),
  check_codes: List(),
});

const FETCH_CODES = '/event_log/FETCH_CODES';
const CHECK_CODE = '/event_log/CHECK_CODE';
const FILTER_CHANGE = '/event_log/FILTER_CHANGE';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_CHANGE:
      return state.merge({ [action.filter]: action.value });
    case FETCH_CODES:
      return state.merge({ codes: List(action.codes.map(i => i.id)) });
    case CHECK_CODE:
      return state.merge({ check_codes: List(action.codes) });
    default:
      return state;
  }
}

export function filterChange(filter, value) {
  return {
    type: FILTER_CHANGE,
    filter,
    value,
  };
}

export function fetchCodes(codes) {
  return {
    type: FETCH_CODES,
    codes,
  };
}

export function checkCode(codes) {
  return {
    type: CHECK_CODE,
    codes,
  };
}

export function loadCodes() {
  return (dispatch, getState, fetch) =>
    fetch(urlJoin(API_URL, '/event_codes'))
      .then(response => dispatch(fetchCodes(response.json)));
}
