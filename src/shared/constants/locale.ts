// general
export const PLEASE_WAIT = 'please_wait';
export const SYSTEM = 'system';
export const DARK = 'dark';
export const LIGHT = 'light';
export const DEFAULT = 'default';
export const TITLE = 'title';

export const NAME = 'name';
export const VALUE = 'value';
export const WATCHER = 'watcher';
export const WATCHERS = 'watchers';
export const RECORD = 'record';
export const RECORDS = 'records';

// watchers
export const RECORDS_COUNT = 'records_count';

// dashboard
export const SENTRY = 'sentry';
export const LAST_PARSED = 'last_parsed';

// eslint-disable-next-line
export const getMessages = (messages?: any) => ({
  general: {
    [PLEASE_WAIT]: messages?.general.PLEASE_WAIT,
    [SYSTEM]: messages?.general.SYSTEM,
    [DARK]: messages?.general.DARK,
    [LIGHT]: messages?.general.LIGHT,
    [DEFAULT]: messages?.general.DEFAULT,
    [NAME]: messages?.general.NAME,
    [VALUE]: messages?.general.VALUE,
    [WATCHER]: messages?.general.WATCHER,
    [WATCHERS]: messages?.general.WATCHERS,
    [RECORD]: messages?.general.RECORD,
    [RECORDS]: messages?.general.RECORDS,
  },
  watchers: {
    [RECORDS_COUNT]: messages?.watchers.RECORDS_COUNT,
    [LAST_PARSED]: messages?.watchers.LAST_PARSED,
  },
  pages: {
    dashboard: {
      [TITLE]: messages?.pages.dashboard.TITLE,
      [SENTRY]: messages?.general.SENTRY,
      [LAST_PARSED]: messages?.general.LAST_PARSED,
    },
  },
});

export const MESSAGES = getMessages();
