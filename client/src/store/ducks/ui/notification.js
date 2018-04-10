import { Map } from 'immutable';

export const OPEN_NOTIFICATION = 'notification/OPEN_NOTIFICATION';
export const OPEN = 'notification/OPEN';
export const HIDE = 'notification/HIDE';

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
