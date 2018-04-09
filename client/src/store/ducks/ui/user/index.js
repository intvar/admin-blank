import { Map } from 'immutable';

export const SIGN_IN = 'user/SIGN_IN';
export const SIGN_IN_START = 'user/SIGN_IN_START';
export const SIGN_IN_SUCCESS = 'user/SIGN_IN_SUCCESS';
export const SIGN_IN_ERROR = 'user/SIGN_IN_ERROR';
export const signIn = ({ password, email }) => ({
  type: SIGN_IN,
  password,
  email,
});
export const signInStart = () => ({ type: SIGN_IN_START });
export const signInSuccess = userData => ({
  type: SIGN_IN_SUCCESS,
  user: userData,
});
export const signInError = error => ({
  type: SIGN_IN_ERROR,
  error,
});


export const SIGN_OUT = 'user/SIGN_OUT';
export const SIGN_OUT_START = 'user/SIGN_OUT_START';
export const SIGN_OUT_SUCCESS = 'user/SIGN_OUT_SUCCESS';
export const SIGN_OUT_ERROR = 'user/SIGN_OUT_ERROR';
export const signOut = () => ({ type: SIGN_OUT });
export const signOutStart = () => ({ type: SIGN_OUT_START });
export const signOutSuccess = () => ({ type: SIGN_OUT_SUCCESS });
export const signOutError = error => ({
  type: SIGN_OUT_ERROR,
  error,
});

const PASSWORD_RESTORED = 'user/PASSWORD_RESTORED';
function passwordRestored() {
  return {
    type: PASSWORD_RESTORED,
  };
}

const initialUserState = Map({
  personalData: {
    first_name: null,
    last_name: null,
    email: null,
  },
  isAuthorized: false,
  isLoading: false,
  error: null,
});

export default function user(state = initialUserState, action) {
  switch (action.type) {
    case SIGN_IN_START:
      return state.merge({
        isLoading: true,
        error: null,
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
        error: action.error,
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
        error: action.error,
      });
    case PASSWORD_RESTORED:
      return state.set('isAuthorized', true);
    default:
      return state;
  }
}
