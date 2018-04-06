import { Map } from 'immutable';

export const LOAD = '/event_log/LOAD';
const LOAD_START = '/event_log/LOAD_START';
const LOAD_SUCCESS = '/event_log/LOAD_SUCCEESS';
const RESET = '/event_log/RESET';

export const load = () => ({ type: LOAD });
export const loadStart = () => ({ type: LOAD_START });
export const loadSuccess = event_logs => ({
  type: LOAD_SUCCESS,
  event_logs,
});
export const reset = () => ({ type: RESET });

export const initialState = Map({
  list: Map(),
  page_number: 1,
  has_more: true,
  isLoading: false,
});

export default (state = initialState, { type, event_logs }) => {
  switch (type) {
    case LOAD_START:
      return state.set('isLoading', true);
    default:
      return state;
  }
};
