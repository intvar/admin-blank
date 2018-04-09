import { Map } from 'immutable';
import mapKeys from 'lodash/mapKeys';

const limit = 40;
export const LOAD = '/event_log/LOAD';
export const RELOAD = '/event_log/REALOAD';
const LOAD_START = '/event_log/LOAD_START';
const LOAD_SUCCESS = '/event_log/LOAD_SUCCEESS';
const RESET = '/event_log/RESET';

export const load = () => ({ type: LOAD });
export const reload = () => ({ type: RELOAD });
export const loadStart = () => ({ type: LOAD_START });
export const loadSuccess = event_logs => ({
  type: LOAD_SUCCESS,
  event_logs,
});
export const reset = () => ({ type: RESET });

export const initialState = Map({
  list: Map(),
  pageNumber: 1,
  hasMore: true,
  isLoading: false,
});

export default (state = initialState, { type, event_logs }) => {
  switch (type) {
    case LOAD_START:
      return state.set('isLoading', true);
    case LOAD_SUCCESS:
      return state.merge({
        isLoading: false,
        pageNumber: state.get('pageNumber') + 1,
        hasMore: (event_logs.length === limit),
        list: state.get('list').merge(mapKeys(event_logs, 'id')),
      });
    case RESET:
      return initialState;
    default:
      return state;
  }
};
