import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

import { Loader } from '@shared/ui';
import { DATE_FORMATS, LOCAL_STORAGE_KEYS, getMessages } from '@shared/constants';
import { sortSymbolsInitial } from './locale-provider-constants';
import { getLocales, getLocalesSelector, getMessagesByLocaleCode, getMessagesSelector } from '@components/locales';
import { LocaleContext, useAppDispatch, useAppSelector } from '@shared/hooks';
import { TLocaleMessages, TSortSymbols } from '@store/locales';

export const LocaleProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const locales = useAppSelector(getLocalesSelector);
  const allMessages = useAppSelector(getMessagesSelector);

  const savedLocale = localStorage.getItem(LOCAL_STORAGE_KEYS.savedLocale) || '';
  const [currentLocale, setCurrentLocale] = useState(savedLocale);
  const [currentCurrency, setCurrentCurrency] = useState('');
  const [sortSymbols, setSortSymbols] = useState<TSortSymbols>(sortSymbolsInitial);
  const [messages, setMessages] = useState<TLocaleMessages>({});

  useEffect(() => dispatch(getLocales()), [dispatch]);

  useEffect(() => {
    const current = Object.values(locales).find((locale) => locale.code === currentLocale);

    setSortSymbols((prevState) => {
      if (current) {
        return current?.sortSymbols;
      } else {
        return prevState;
      }
    });

    setCurrentCurrency((prevState) => {
      if (current) {
        return current.defaultCurrencySymbol;
      } else {
        return prevState;
      }
    });
  }, [currentLocale, locales]);

  useEffect(() => {
    const defaultLocale = Object.values(locales).find((locale) => locale.default)?.code;
    !currentLocale && defaultLocale && setCurrentLocale(defaultLocale);
  }, [currentLocale, locales]);

  useEffect(() => {
    if (currentLocale) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.savedLocale, currentLocale);

      if (allMessages[currentLocale]) {
        setMessages(getMessages(allMessages[currentLocale]));
      } else {
        dispatch(getMessagesByLocaleCode(currentLocale));
      }
    }
  }, [currentLocale, allMessages, dispatch]);

  const switchLocale = (locale: string) => {
    setCurrentLocale(locale);
  };

  const toLocaleDate = (date?: string | number | Date, format = 'short', defaultValue = '—') => {
    if (!date) {
      return defaultValue;
    }

    switch (format) {
      case DATE_FORMATS.short:
        return new Date(date)
          .toLocaleString(currentLocale, { dateStyle: 'short', timeStyle: 'short' })
          .split(',')
          .join('');
      case DATE_FORMATS.standard:
        return new Date(date)
          .toLocaleString(currentLocale, {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          })
          .split(',')
          .join(' ');
      default:
        return '';
    }
  };

  const value = { currentCurrency, currentLocale, locales, messages, sortSymbols, switchLocale, toLocaleDate };

  return (
    <LocaleContext.Provider value={value}>
      {messages && Object.keys(messages).length && Object.getPrototypeOf(messages) === Object.prototype ? (
        children
      ) : (
        <Loader />
      )}
    </LocaleContext.Provider>
  );
};
