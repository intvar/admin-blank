import { List, Map } from 'immutable';

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
