import axios from 'axios';

/**
 * @todo add error handling
 */
axios.interceptors.response.use(res => res, (error) => {
  if (!error.response) {
    console.log('network message');
    // yield call(openNotification, { message: 'Network error' });
  } else if (error.response.status === 401) {
    console.log('unauthorized');
  }
  return Promise.reject(error);
});
