import { Map } from 'immutable';

export const START = 'user/START';
export const SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS';
export const SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS';
export const PASSWORD_RESTORED = 'user/PASSWORD_RESTORED';
export const FINISH = 'user/FINISH';
export const ERROR = 'user/ERROR';


const initialUserState = Map({
  personalData: {
    first_name: null,
    last_name: null,
    email: null,
  },
  isAuthorized: false,
  isLoading: false,
});

export default function user(state = initialUserState, action) {
  switch (action.type) {
    case START:
      return state.set('isLoading', true);
    case FINISH:
    case ERROR:
      return state.set('isLoading', false);
    case SIGN_IN_SUCCESS:
      return state.merge({
        isAuthorized: true,
        isLoading: false,
        personalData: action.user,
      });
    case SIGN_OUT_SUCCESS:
      return state.merge({
        isAuthorized: false,
        isLoading: false,
        personalData: null,
      });
    case PASSWORD_RESTORED:
      return state.set('isAuthorized', true);
    default:
      return state;
  }
}
