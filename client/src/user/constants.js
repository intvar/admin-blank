export const USER_STATUS_NOT_VERIFY = 0;
export const USER_STATUS_ACTIVE = 1;
export const USER_STATUS_BLOCKED = 2;


export const USER_STATUSES = {
  [USER_STATUS_NOT_VERIFY]: 'Waiting for email verification',
  [USER_STATUS_ACTIVE]: 'Active',
  [USER_STATUS_BLOCKED]: 'Blocked',
};

export const USER_PERMISSIONS = {
  operator: 'Operator',
  security_admin: 'Security admin',
  ico_manager: 'ICO manager',
};
