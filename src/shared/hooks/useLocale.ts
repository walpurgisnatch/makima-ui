import { createContext, useContext } from 'react';

import { ILocaleContext } from '../types';

const initialLocaleContext = {
  currentCurrency: '',
  currentLocale: '',
  locales: {},
  messages: {},
  sortSymbols: {
    number: {
      first: '1',
      last: '9',
    },
    string: {
      first: 'a',
      last: 'z',
    },
  },
  switchLocale: () => {
    return;
  },
  toLocaleDate: () => {
    return '';
  },
};

export const LocaleContext = createContext<ILocaleContext>(initialLocaleContext);

export const useLocale = () => {
  return useContext(LocaleContext);
};
