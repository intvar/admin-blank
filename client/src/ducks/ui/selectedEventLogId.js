import { appName } from '../../config';

export const moduleName = 'selectedEveventLogId';
const prefix = `${appName}/${moduleName}`;

export const SET_CURRENT_ID = `${prefix}/SET_CURRENT_ID`;

export default function (state = null, { type, event_log_id }) {
  switch (type) {
    case SET_CURRENT_ID:
      return event_log_id;
    default:
      return state;
  }
}
