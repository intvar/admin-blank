export const TOGGLE = 'leftMenu/TOGGLE';

export default (state = true, { type }) => {
  switch (type) {
    case TOGGLE:
      return !state;
    default:
      return state;
  }
};
