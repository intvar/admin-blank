import axios from 'axios';
import { store } from '../store';
import { SIGN_OUT_SUCCESS } from '../store/ducks/ui/user';
import history from './utils';

/**
 * @todo add error handling
 */
axios.interceptors.response.use(res => res, (error) => {
  if (!error.response) {
    console.log('network message');
    // yield call(openNotification, { message: 'Network error' });
  } else if (error.response.status === 401) {
    store.dispatch({ type: SIGN_OUT_SUCCESS });
    history.push('/signin');
  }
  return Promise.reject(error);
});
