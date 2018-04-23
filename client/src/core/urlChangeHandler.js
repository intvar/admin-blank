import browserHistory from './utils';
import { SET } from '../store/ducks/ui/title';
import { store } from '../store';

browserHistory.listen((location) => {
  const { pathname } = location;
  if (pathname) {
    let title;
    if (pathname.includes('admins')) {
      title = 'Admins';
    } else if (pathname.includes('users')) {
      title = 'Users';
    } else if (pathname.includes('event-log')) {
      title = 'Events';
    }
    if (title) {
      store.dispatch({
        type: SET,
        title,
      });
    }
  }
});
