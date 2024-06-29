import { LOCAL_STORAGE_KEYS, THEMES } from '../constants';

export const getTheme = () => {
  const theme = `${localStorage.getItem(LOCAL_STORAGE_KEYS.theme)}`;

  if (Object.values(THEMES).includes(theme)) return theme;
  return THEMES.system;
};

export const getPrefersColorScheme = (currentTheme: string) => {
  const isSystemTheme = currentTheme === THEMES.system;
  const isLightTheme = isSystemTheme
    ? window.matchMedia('(prefers-color-scheme: light)').matches
    : currentTheme === THEMES.light;

  return isLightTheme ? THEMES.light : THEMES.dark;
};
