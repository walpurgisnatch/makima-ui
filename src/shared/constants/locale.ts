export const PLEASE_WAIT = 'please_wait'
export const DARK = 'dark'
export const LIGHT = 'light'
export const DEFAULT = 'default'
export const TITLE = 'title'

export const getMessages = (messages?: any) => ({
  general: {
    [PLEASE_WAIT]: messages?.general.PLEASE_WAIT,
    [DARK]: messages?.general.DARK,
    [LIGHT]: messages?.general.LIGHT,
    [DEFAULT]: messages?.general.DEFAULT
  },
  pages: {
    dashboard: {
      [TITLE]: messages?.pages.dashboard.TITLE
    }
  }
})

export const MESSAGES = getMessages();