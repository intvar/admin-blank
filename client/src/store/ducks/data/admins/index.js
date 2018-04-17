import { Map } from 'immutable';
import mapKeys from 'lodash/mapKeys';

const limit = 20;

export const initialState = Map({
  list: Map(),
  pageNumber: 1,
  hasMore: true,
  isLoading: false,
});

export const START = 'admins/START';
export const CREATE_SUCCESS = 'admins/CREATE_SUCCESS';
export const RETRIEVE_LIST_SUCCESS = 'admins/RETRIEVE_LIST_SUCCESS';
export const RETRIEVE_ONE_SUCCESS = 'admins/RETRIEVE_ONE_SUCCESS';
export const UPDATE_SUCCESS = 'admins/UPDATE_SUCCESS';
export const DELETE_SUCCESS = 'admins/DELETE_SUCCESS';
export const ERROR = 'admins/ERROR';
export const RESET = 'admins/RESET';

export default (
  state = initialState,
  {
    type,
    admin,
    admins,
    adminId,
  },
) => {
  const adminIdStr = String(adminId);
  switch (type) {
    case START:
      return state.set('isLoading', true);
    case CREATE_SUCCESS:
      return state.merge({
        isLoading: false,
        list: state.get('list').merge({ [adminId]: { id: adminId, ...admin } }),
      });
    case RETRIEVE_ONE_SUCCESS:
      return state.merge({
        isLoading: false,
        list: state.get('list').merge({ [admin.id]: admin }),
      });
    case RETRIEVE_LIST_SUCCESS:
      return state.merge({
        isLoading: false,
        list: state.get('list').merge(mapKeys(admins, 'id')),
        pageNumber: state.get('pageNumber') + 1,
        hasMore: (admins.length === limit),
      });
    case UPDATE_SUCCESS:
      return state.updateIn(['list', adminIdStr], u => u.merge(admin)).set('isLoading', false);
    case DELETE_SUCCESS:
      return state.deleteIn(['list', adminIdStr]).set('isLoading', false);
    case ERROR:
      return state.set('isLoading', false);
    case RESET:
      return initialState;
    default:
      return state;
  }
};

