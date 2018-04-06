export const DEVELOPMENT_MODE = 'development';
export const PRODUCTION_MODE = 'production';

// background color gray
export const MAIN_BACKGROUND_COLOR = 'rgb(237, 243, 247)';
// primary color violette
export const PRIMARY_COLOR = 'rgb(96, 41, 246)';
// secondary color turquoise
export const SECONDARY_COLOR = 'rgb(134, 217, 210)';
// Text color card gray
export const CARD_TEXT_COLOR = '#5d5d5d';

export const DENY_NETWORK_MESSAGE = 'You don\'t have access to this action. Please authorize or will get access.';
export const PASSWORD_RESTORED_MESSAGE = 'You have successfully set the password!';
export const RECOVER_MESSAGE_SENT_MESSAGE = 'A letter with further instructions has been sent to your e-mail!';
export const REGISTRATION_MESSAGE = RECOVER_MESSAGE_SENT_MESSAGE;
export const INTERNAL_SERVER_ERROR_MESSAGE = 'Internal server Error!';

// Constants for use APi call
export const API_URL = (process.env.NODE_ENV === DEVELOPMENT_MODE) ? '/api/v1/' : API_URL_ENV;

export const SUPPORTED_LOCALES = {
  ru: { name: 'ru', code: 'ru' },
  'gb-eng': { name: 'en', code: 'gb-eng' },
};

export const DEFAULT_LOCALE = 'gb-eng';
