export const USER_STATUS_NOT_VERIFY = 0;
export const USER_STATUS_ACTIVE = 1;
export const USER_STATUS_BLOCKED = 2;

export const USER_KYC_STATUS_NOT_CHECKED = 0;
export const USER_KYC_STATUS_PENDING = 1;
export const USER_KYC_STATUS_CHECKED = 2;
export const USER_KYC_STATUS_REJECTED = 3;
export const USER_KYC_STATUS_AWAITS_OPERATOR = 4;


export const USER_STATUSES = {
  [USER_STATUS_NOT_VERIFY]: 'Waiting for email verification',
  [USER_STATUS_ACTIVE]: 'Active',
  [USER_STATUS_BLOCKED]: 'Blocked',
};

export const USER_KYC_STATUSES = {
  [USER_KYC_STATUS_NOT_CHECKED]: 'Not checked',
  [USER_KYC_STATUS_PENDING]: 'In progress',
  [USER_KYC_STATUS_CHECKED]: 'Checked',
  [USER_KYC_STATUS_REJECTED]: 'Rejected',
  [USER_KYC_STATUS_AWAITS_OPERATOR]: 'Awaits operator',
};

export const USER_PERMISSIONS = {
  operator: 'Operator',
  security_admin: 'Security admin',
  ico_manager: 'ICO manager',
};
