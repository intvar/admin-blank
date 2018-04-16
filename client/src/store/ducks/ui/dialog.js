import { Map } from 'immutable';

export const SHOW = 'dialog/SHOW';
export const HIDE = 'dialog/HIDE';

const initialState = Map({
  dialogProperties: null,
  component: null,
  componentProperties: null,
});

export default function dialog(state = initialState, {
  type,
  dialogProperties,
  component,
  componentProperties,
}) {
  switch (type) {
    case SHOW:
      return state.merge({
        dialogProperties,
        component,
        componentProperties,
      });
    case HIDE:
      return initialState;
    default:
      return state;
  }
}
