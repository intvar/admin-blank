import immutable from 'immutable';

const NAVIGATE = 'navigation/NAVIGATE';

export default function navigation(state = immutable.Map({ currentRoute: '/' }), action) {
  switch (action.type) {
    case NAVIGATE:
      return state.set('currentRoute', action.route);
    default:
      return state;
  }
}

export function navigateTo(route) {
  return {
    type: NAVIGATE,
    route,
  };
}
