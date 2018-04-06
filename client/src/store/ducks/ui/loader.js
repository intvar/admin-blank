import { Map } from 'immutable';

export const LOAD_START = 'loader/LOAD_START';
export const LOAD_END = 'loader/LOAD_END';

export default (state = Map({ isLoading: false }), action) => {
  switch (action.type) {
    case LOAD_START:
      return state.set('isLoading', true);
    case LOAD_END:
      return state.set('isLoading', false);
    default:
      return state;
  }
};

export function loadStart() {
  return {
    type: LOAD_START,
  };
}

export function loadEnd() {
  return {
    type: LOAD_END,
  };
}
