export const SET = 'title/SET';

export default (state = null, { type, title }) => {
  switch (type) {
    case SET:
      return title;
    default:
      return state;
  }
};
