import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { appName } from '../../config';

export const moduleName = 'loader';
const prefix = `${appName}/${moduleName}`;

export const LOAD_START = `${prefix}/LOAD_START`;
export const LOAD_END = `${prefix}/LOAD_END`;

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

export const loaderSelector = createSelector(
  state => state.ui[moduleName],
  loader => loader.get('isLoading'),
);
