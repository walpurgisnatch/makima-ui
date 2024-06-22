import { TLocales, TLocaleMessages, TSortSymbols } from '@store/locales';

export interface ILocaleContext {
  currentCurrency: string;
  currentLocale: string;
  locales: TLocales;
  messages: TLocaleMessages;
  sortSymbols: TSortSymbols;
  switchLocale: (locale: string) => void;
  toLocaleDate: (date?: string | number | Date, format?: string, defaultValue?: string) => string;
}
