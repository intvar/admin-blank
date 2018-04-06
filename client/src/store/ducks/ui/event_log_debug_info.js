import { Map } from 'immutable';
import urlJoin from 'url-join';
import { API_URL } from '../../../core/constants';
import { showDialog } from '../ui/dialog';
import DebugInfoViewer from '../../../event_logs/components/debug_info_viewer';

const initialState = Map({
  isFetching: false,
  debugInfo: null,
  errorText: null,
});

const FETCH_START = 'event_log_debug_info/FETCH_START';
const FETCH_SUCCESS = 'event_log_debug_info/FETCH_SUCCESS';
const FETCH_ERROR = 'event_log_debug_info/FETCH_ERROR';

export default function (state = initialState, action) {
  const { type, debugInfo, errorText } = action;

  switch (type) {
    case FETCH_START:
      return state.set('isFetching', true);
    case FETCH_SUCCESS:
      return state.merge(Map({
        debugInfo,
        isFetching: false,
        errorText: null,
      }));
    case FETCH_ERROR:
      return state.merge(Map({
        errorText,
        isFetching: false,
      }));
    default:
      return state;
  }
}

const fetchStart = () => ({ type: FETCH_START });
const fetchError = errorText => ({ type: FETCH_ERROR, errorText });

export const fetchDebugInfo = eventId => (dispatch, getState, fetch) => {
  dispatch(fetchStart());

  fetch(urlJoin(API_URL, '/events', eventId, '/debug_info'))
    .then(({ json }) => {
      dispatch({ type: FETCH_SUCCESS, debugInfo: (typeof json) === 'function' ? null : json });
      // material ui dialog fix
      window.dispatchEvent(new Event('resize'));
    })
    .catch(e => dispatch(fetchError(e.error)));
};

export const showDebugInfo = eventId => (dispatch) => {
  dispatch(showDialog({
    component: DebugInfoViewer,
  }));

  dispatch(fetchDebugInfo(eventId));
};

