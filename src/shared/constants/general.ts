export enum LOCAL_STORAGE_KEYS {
  savedLocale = 'saved-locale',
  theme = 'theme',
  token = 'ngStorage-token',
  user = 'ngStorage-user',
}

export const THEMES = {
  dark: 'dark',
  light: 'light',
  system: 'system',
};

export enum DATE_FORMATS {
  short = 'short',
  standard = 'standard',
}

export const SENTRY_TYPES = [
  {
    value: 'common',
    label: 'general.sentry_types.common',
  },
  {
    value: 'html',
    label: 'general.sentry_types.html',
  },
  {
    value: 'api',
    label: 'general.sentry_types.api',
  },
];
