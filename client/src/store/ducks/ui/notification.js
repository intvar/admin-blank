import { Map } from 'immutable';

const OPEN = 'notification/OPEN';
const HIDE = 'notification/HIDE';

const initialState = Map({
  message: '',
  open: false,
  autoHideDuration: 4000,
});

export default (state = initialState, action) => {
  const { type, message, autoHideDuration } = action;

  switch (type) {
    case OPEN:
      return state.merge(new Map({ message, open: true, autoHideDuration }));
    case HIDE:
      return state.set('open', false);

    default:
      return state;
  }
};

export function openNotification({ message, autoHideDuration = 4000 }) {
  return (dispatch) => {
    dispatch({
      type: OPEN,
      message,
      autoHideDuration,
    });

    setTimeout(() => {
      dispatch({ type: HIDE });
    }, autoHideDuration);
  };
}
