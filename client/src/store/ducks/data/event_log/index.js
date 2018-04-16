import { Map, OrderedMap } from 'immutable';
import mapKeys from 'lodash/mapKeys';

const limit = 40;
export const LOAD = '/event_log/LOAD';
export const RELOAD = '/event_log/RELOAD';
export const SHOW_DEBUG_INFO = '/event_log/SHOW_DEBUG_INFO';
export const LOAD_START = '/event_log/LOAD_START';
export const LOAD_SUCCESS = '/event_log/LOAD_SUCCEESS';
export const LOAD_DEBUG_INFO_SUCCESS = '/event_log/LOAD_DEBUG_INFO_SUCCESS';
export const LOAD_ERROR = '/event_log/LOAD_ERROR';
export const RESET = '/event_log/RESET';

export const initialState = Map({
  list: OrderedMap(),
  pageNumber: 1,
  hasMore: true,
  isLoading: false,
});

const getOrderedMapEventLogs = event_logs => OrderedMap(mapKeys(event_logs, 'id')).reverse();

export default (state = initialState, {
  type,
  event_logs,
  debug_info,
  event_log_id,
}) => {
  switch (type) {
    case LOAD_START:
      return state.set('isLoading', true);
    case LOAD_SUCCESS:
      return state.merge({
        isLoading: false,
        pageNumber: state.get('pageNumber') + 1,
        hasMore: (event_logs.length === limit),
        list: state.get('list').merge(getOrderedMapEventLogs(event_logs)),
      });
    case LOAD_DEBUG_INFO_SUCCESS:
      return state.updateIn(['list', String(event_log_id)], i => ({ ...i, debug_info }))
        .set('isLoading', false);
    case RESET:
      return initialState;
    case LOAD_ERROR:
      return state.set('isLoading', false);
    default:
      return state;
  }
};
