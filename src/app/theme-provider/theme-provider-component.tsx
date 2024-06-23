import React, { FC, useCallback, useEffect, useState } from 'react';

import { LOCAL_STORAGE_KEYS } from '@shared/constants';
import { ThemeContext } from '@shared/hooks';
import { getPrefersColorScheme, getTheme } from '@shared/lib';
import { IThemeProviderProps } from './theme-provider-types';

export const ThemeProvider: FC<IThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);
  const [prefersColorScheme, setPrefersColorScheme] = useState(getPrefersColorScheme(theme));

  const onChangePrefersColorScheme = useCallback(
    () => setPrefersColorScheme(() => getPrefersColorScheme(theme)),
    [theme]
  );

  useEffect(() => {
    const isLightColorScheme = window.matchMedia('(prefers-color-scheme: light)');

    isLightColorScheme.addEventListener('change', onChangePrefersColorScheme);

    return () => {
      isLightColorScheme.removeEventListener('change', onChangePrefersColorScheme);
    };
  }, [onChangePrefersColorScheme]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(LOCAL_STORAGE_KEYS.theme, theme);
    setPrefersColorScheme(() => getPrefersColorScheme(theme));
  }, [theme]);

  const switchTheme = (theme: string) => {
    setTheme(theme);
  };

  const value = { prefersColorScheme, theme, switchTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
