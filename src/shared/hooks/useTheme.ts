import { createContext, useContext } from 'react';

import { IThemeContext } from '../types';

const initialThemeContext = {
  prefersColorScheme: '',
  theme: '',
  switchTheme: () => {
    return;
  },
};

export const ThemeContext = createContext<IThemeContext>(initialThemeContext);

export const useTheme = () => {
  return useContext(ThemeContext);
};
