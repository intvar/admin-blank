import { List, Map } from 'immutable';
import urlJoin from 'url-join';
import { loadStart, loadEnd } from '../ui/loader';
import { showDialog } from '../ui/dialog';
import { openNotification } from '../ui/notification';
import { API_URL } from '../../../core/constants';
import history, { objToQSParams } from '../../../core/utils/';

const FETCH_START = 'users/FETCH_START';
const FETCH_SUCESSS = 'users/FETCH_SUCCESS';
const FETCH_USER_SUCESSS = 'users/FETCH_USER_SUCCESS';
const FETCH_MORE_SUCCESS = 'users/FETCH_MORE_SUCCESS';
const FETCH_ERROR = 'users/FETCH_ERROR';
const ADD = 'users/ADD';
const UPDATE = 'users/UPDATE';
const DELETE = 'users/DELETE';

const initialState = Map({
  isLoading: false,
  users: List([]),
  page: 1,
  hasMoreUsers: true,
});

const pageSize = 20;

export default (state = initialState, action) => {
  const { type, users, userData } = action;
  const id = +action.id;

  switch (type) {
    case FETCH_START:
      return state.set('isLoading', true);

    case FETCH_SUCESSS:
      return state.merge(Map({
        users: List(users),
        isLoading: false,
        page: 1,
        hasMoreUsers: users.length === pageSize,
      }));

    case FETCH_USER_SUCESSS:
      return state.merge(Map({
        users: state.get('users').push(userData),
        isLoading: false,
      }));

    case FETCH_MORE_SUCCESS:
      return state.merge(Map({
        users: state.get('users')
          .concat(users)
          .groupBy(e => e.id)
          .map(e => e.first())
          .toList(),
        isLoading: false,
        hasMoreUsers: users.length === pageSize,
        page: state.get('page') + 1,
      }));

    case FETCH_ERROR:
      return state.merge(Map({
        isLoading: false,
        hasMoreUsers: false,
      }));

    case ADD:
      return state.set('users', state.get('users').push({
        id,
        ...userData,
      }));

    case UPDATE:
      return state.set('users', state.get('users').update(
        state.get('users').findIndex(user => user.id === id),
        userWillUpdate => Object.assign({}, userWillUpdate, userData),
      ));

    case DELETE:
      return state.set('users', state.get('users').delete(
        state.get('users').findIndex(user => user.id === id),
      ));

    default:
      return state;
  }
};

function fetchStart() {
  return {
    type: FETCH_START,
  };
}

function fetchError() {
  return {
    type: FETCH_ERROR,
  };
}

export function fetchUsers() {
  return (dispatch, getState, fetch) => {
    const filter = getState().ui.users_filters.toJS();
    const fullFilter = {
      limit: pageSize,
      ...filter,
    };
    dispatch(fetchStart());

    fetch(urlJoin(API_URL, `/users?${objToQSParams(fullFilter)}`), {
      method: 'GET',
    })
      .then((res) => {
        dispatch({
          type: FETCH_SUCESSS,
          users: res.json,
        });
      })
      .catch(() => dispatch(fetchError()));
  };
}

export function fetchUser(id) {
  return (dispatch, getState, fetch) => {
    dispatch(loadStart());

    fetch(urlJoin(API_URL, `/users/${id}`), {
      method: 'GET',
    })
      .then((res) => {
        dispatch({
          type: FETCH_USER_SUCESSS,
          userData: res.json,
        });
        dispatch(loadEnd());
      })
      .catch(() => dispatch(loadEnd()));
  };
}

export function fetchMoreUsers() {
  return (dispatch, getState, fetch) => {
    const filter = getState().ui.users_filters.toJS();
    const fullFilter = {
      limit: pageSize,
      ...filter,
      page: getState().data.users.get('page') + 1,
    };

    dispatch(fetchStart());

    return fetch(urlJoin(API_URL, `/users?${objToQSParams(fullFilter)}`), {
      method: 'GET',
    })
      .then((res) => {
        dispatch({
          type: FETCH_MORE_SUCCESS,
          users: res.json,
        });
      })
      .catch(() => dispatch(fetchError()));
  };
}

export function updateUser(id, userData) {
  return (dispatch, getState, fetch) => {
    dispatch(loadStart());

    fetch(urlJoin(API_URL, `/users/${id}`), {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
      .then(() => {
        dispatch(openNotification({ message: 'You have successfully updated the user!' }));
        dispatch({
          type: UPDATE,
          id,
          userData,
        });

        dispatch(loadEnd());
      })
      .catch(() => dispatch(loadEnd()));
  };
}

export function addUser(userData) {
  return (dispatch, getState, fetch) => {
    dispatch(loadStart());

    fetch(urlJoin(API_URL, '/users/'), {
      method: 'POST',
      body: JSON.stringify(userData),
    })
      .then(({ res }) => {
        dispatch(openNotification({ message: 'You have successfully added the user!' }));
        history.push('/users/');
        dispatch({
          type: ADD,
          id: res.json.id,
          userData,
        });
        dispatch(loadEnd());
      })
      .catch(() => dispatch(loadEnd()));
  };
}

function deleteUser(id, dispatch, getState, fetch) {
  dispatch(loadStart());
  fetch(urlJoin(API_URL, `/users/${id}`), {
    method: 'DELETE',
  })
    .then(() => {
      dispatch(loadEnd());
      dispatch(openNotification({ message: 'You have successfully deleted the user!' }));
      dispatch({
        type: DELETE,
        id,
      });
    })
    .catch(() => dispatch(loadEnd()));
}

export function showDeleteDialog(id) {
  return showDialog({
    title: 'Delete user',
    message: 'Are you sure what you want to delete the user?',
    isDialog: true,
    onAccept: deleteUser.bind(null, +id),
  });
}
