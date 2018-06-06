export const SET_CURRENT_ID = 'selectedEveventLogId/SET_CURRENT_ID';

export default function (state = null, { type, event_log_id }) {
  switch (type) {
    case SET_CURRENT_ID:
      return event_log_id;
    default:
      return state;
  }
}
