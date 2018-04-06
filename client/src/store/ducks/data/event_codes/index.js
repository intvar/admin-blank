import { List, Map } from 'immutable';

export const LOAD = 'event_codes/LOAD';
const LOAD_START = 'event_codes/LOAD_START';
const LOAD_FINISH = 'event_codes/LOAD_FINISH';
const LOAD_ERROR = 'event_codes/LOAD_ERROR';

export const load = () => ({ type: LOAD });
export const loadStart = () => ({ type: LOAD_START });
export const loadFinish = event_codes => ({
  type: LOAD_FINISH,
  event_codes,
});
export const loadError = () => ({ type: LOAD_ERROR });

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
