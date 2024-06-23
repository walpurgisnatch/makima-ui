import axios from 'axios';

import { TLocales, TLocaleMessages } from '@store/locales';

export const localesApi = {
  getLocales: () => axios.get<TLocales>('/locales/locales.json'),
  getMessagesByLocaleCode: (code: string) => axios.get<TLocaleMessages>(`/locales/${code}.json`),
};
