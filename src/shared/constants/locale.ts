// general
export const PLEASE_WAIT = 'please_wait';
export const SYSTEM = 'system';
export const DARK = 'dark';
export const LIGHT = 'light';
export const DEFAULT = 'default';
export const TITLE = 'title';
export const PARSED = 'parsed';

export const ID = 'id';
export const NAME = 'name';
export const VALUE = 'value';
export const WATCHER = 'watcher';
export const WATCHERS = 'watchers';
export const RECORD = 'record';
export const RECORDS = 'records';

// watchers
export const RECORDS_COUNT = 'records_count';
export const CURRENT_VALUE = 'current_value';
export const LAST_PARSED = 'last_parsed';

// Home
export const SENTRY = 'sentry';

// eslint-disable-next-line
export const getMessages = (messages?: any) => ({
  general: {
    [PLEASE_WAIT]: messages?.general.PLEASE_WAIT,
    [SYSTEM]: messages?.general.SYSTEM,
    [DARK]: messages?.general.DARK,
    [LIGHT]: messages?.general.LIGHT,
    [DEFAULT]: messages?.general.DEFAULT,
    [PARSED]: messages?.general.PARSED,
    [ID]: messages?.general.ID,
    [NAME]: messages?.general.NAME,
    [VALUE]: messages?.general.VALUE,
    [WATCHER]: messages?.general.WATCHER,
    [WATCHERS]: messages?.general.WATCHERS,
    [RECORD]: messages?.general.RECORD,
    [RECORDS]: messages?.general.RECORDS,
  },
  watchers: {
    [RECORDS_COUNT]: messages?.watchers.RECORDS_COUNT,
    [CURRENT_VALUE]: messages?.watchers.CURRENT_VALUE,
    [LAST_PARSED]: messages?.watchers.LAST_PARSED,
  },
  pages: {
    home: {
      [TITLE]: messages?.pages.home.TITLE,
      [SENTRY]: messages?.pages.home.SENTRY,
      [LAST_PARSED]: messages?.pages.home.LAST_PARSED,
    },
  },
});

export const MESSAGES = getMessages();
