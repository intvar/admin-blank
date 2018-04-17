export const ADMIN_STATUS_WAITING_VERIFYING = 0;
export const ADMIN_STATUS_ACTIVE = 1;
export const ADMIN_STATUS_BLOCKED = 2;

export const ADMIN_STATUSES = {
  [ADMIN_STATUS_WAITING_VERIFYING]: 'Waiting for email verification',
  [ADMIN_STATUS_ACTIVE]: 'Active',
  [ADMIN_STATUS_BLOCKED]: 'Blocked',
};
