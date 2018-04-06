import urlJoin from 'url-join';
import { List } from 'immutable';
// import { API_URL } from '../../../core/constants';
// import { objToQSParams } from '../../../core/utils';

const LOAD = '/event_log/LOAD';
const LOAD_START = '/event'
const LOAD_MORE = '/event_log/LOAD_MORE';
const RESET_PAGE_NUMBER = '/event_log/RESET_PAGE_NUMBER';

const initialState = {
  list: List(),
  page_number: 1,
  hasMore: true,
  limit: 40,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_MORE:
      return {
        ...state,
        list: state.list.concat(action.list).groupBy(i => i.id).map(i => i.first()).toList(),
        page_number: state.page_number + 1,
        hasMore: action.list.length === state.limit,
      };
    case LOAD:
      return {
        ...state,
        list: List(action.list),
        page_number: state.page_number + 1,
        hasMore: action.list.length === state.limit,
      };
    case RESET_PAGE_NUMBER:
      return {
        ...state,
        page_number: 1,
      };
    default:
      return state;
  }
}


function loadMoreSuccess(list) {
  return {
    type: LOAD_MORE,
    list,
  };
}

function loadSuccess(list) {
  return {
    type: LOAD,
    list,
  };
}

export function resetPageNumber() {
  return {
    type: RESET_PAGE_NUMBER,
  };
}

function fetchEventLog(getState, fetch) {
  const { page_number: page, limit } = getState().data.event_log;
  const { is_error,
    event_date_from,
    event_date_to,
    check_codes: codes } = getState().ui.event_log.toJS();

  const params = objToQSParams({
    page,
    limit,
    is_error,
    event_date_from,
    event_date_to,
    codes,
  });
  return fetch(urlJoin(API_URL, `/events?${params}`));
}


export function load() {
  return (dispatch, getState, fetch) => {
    dispatch(resetPageNumber());
    return fetchEventLog(getState, fetch)
      .then(response => dispatch(loadSuccess(response.json)));
  };
}

export function loadMore() {
  return (dispatch, getState, fetch) =>
    fetchEventLog(getState, fetch)
      .then(response => dispatch(loadMoreSuccess(response.json)));
}
