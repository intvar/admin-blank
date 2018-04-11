import { Map } from 'immutable';
import mapKeys from 'lodash/mapKeys';

const limit = 20;

export const initialState = Map({
  list: Map(),
  pageNumber: 1,
  hasMore: true,
  isLoading: false,
});

export const RETRIEVE_LIST = '/users/RETRIEVE_LIST';
export const RETRIEVE_ONE = '/users/RETRIEVE_ONE';
export const UPDATE = '/users/UPDATE';
export const DELETE = '/users/DELETE';

export const START = '/users/START';
export const RETRIEVE_LIST_SUCCESS = '/users/RETRIEVE_LIST_SUCCESS';
export const RETRIEVE_ONE_SUCCESS = '/users/RETRIEVE_ONE_SUCCESS';
export const UPDATE_SUCCESS = '/users/UPDATE_SUCCESS';
export const DELETE_SUCCESS = '/users/DELETE_SUCCESS';
export const ERROR = '/users/ERROR';

export default (
  state = initialState,
  {
    type,
    user,
    users,
    userId,
  },
) => {
  const userIdStr = String(userId);
  switch (type) {
    case START:
      return state.set('isLoading', true);
    case RETRIEVE_ONE_SUCCESS:
      return state.merge({
        isLoading: false,
        list: state.get('list').merge({ [user.id]: user }),
      });
    case RETRIEVE_LIST_SUCCESS:
      return state.merge({
        isLoading: false,
        list: state.get('list').merge(mapKeys(users, 'id')),
        pageNumber: state.get('pageNumber') + 1,
        hasMore: (users.length === limit),
      });
    case UPDATE_SUCCESS:
      return state.updateIn(['list', userIdStr], u => u.merge(user)).set('isLoading', false);
    case DELETE_SUCCESS:
      return state.deleteIn(['list', userIdStr]).set('isLoading', false);
    case ERROR:
      return state.set('isLoading', false);
    default:
      return state;
  }
};

