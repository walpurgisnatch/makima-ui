import { MESSAGES } from '@shared/constants';

export interface IInitialState {
  locales: TLocales;
  messages: {
    [locale: string]: TLocaleMessages;
  };
}

export type TLocales = {
  [locale: string]: TLocale;
};

type TLocale = {
  code: string;
  default: boolean;
  defaultCurrencySymbol: string;
  sortSymbols: TSortSymbols;
  title: string;
};

export type TSortSymbols = {
  number: TSortSymbol;
  string: TSortSymbol;
};

type TSortSymbol = {
  first: string;
  last: string;
};

export type TLocaleMessages = typeof MESSAGES | Record<string, never>;

export interface TSetMessagesProps {
  code: string;
  messages: TLocaleMessages;
}
