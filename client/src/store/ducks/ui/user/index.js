import { Map } from 'immutable';


export const SIGN_IN_START = 'user/SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'user/SIGN_IN_ERROR';

export const SIGN_OUT_START = 'user/SIGN_OUT_START';
export const SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS';
export const SIGN_OUT_ERROR = 'user/SIGN_OUT_ERROR';
export const PASSWORD_RESTORED = 'user/PASSWORD_RESTORED';


const initialUserState = Map({
  personalData: {
    first_name: null,
    last_name: null,
    email: null,
  },
  isAuthorized: false,
  isLoading: false,
  signInError: null,
});

export default function user(state = initialUserState, action) {
  switch (action.type) {
    case SIGN_IN_START:
      return state.merge({
        isLoading: true,
        signInError: null,
      });
    case SIGN_IN_SUCCESS:
      return state.merge({
        isAuthorized: true,
        isLoading: false,
        personalData: action.user,
      });
    case SIGN_IN_ERROR:
      return state.merge({
        isLoading: false,
        signInError: action.error,
      });
    case SIGN_OUT_START:
      return state.set('isLoading', true);
    case SIGN_OUT_SUCCESS:
      return state.merge({
        isAuthorized: false,
        isLoading: false,
        personalData: null,
      });
    case SIGN_OUT_ERROR:
      return state.merge({
        isLoading: false,
      });
    case PASSWORD_RESTORED:
      return state.set('isAuthorized', true);
    default:
      return state;
  }
}
