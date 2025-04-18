import { AppThunk } from '@store/store';
import { localesApi } from './locales-api';
import { setLocales, setMessages } from '@store/locales';

export const getLocales = (): AppThunk => async (dispatch) => {
  try {
    const locales = await localesApi.getLocales();
    dispatch(setLocales(locales.data));
  } catch (error) {
    console.error(error);
  }
};

export const getMessagesByLocaleCode =
  (code: string): AppThunk =>
  async (dispatch) => {
    try {
      const messages = await localesApi.getMessagesByLocaleCode(code);
      dispatch(setMessages({ code, messages: messages.data }));
    } catch (error) {
      console.error(error);
    }
  };
