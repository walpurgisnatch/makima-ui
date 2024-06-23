import { DARK, DEFAULT, LIGHT, THEMES } from '@shared/constants';
import { useLocale } from '@shared/hooks';

export const ThemeToggleOptions = () => {
  const { messages } = useLocale();

  return [
    {
      value: THEMES.light,
      temp: false,
      icon: 'sun',
      label: messages.general[LIGHT],
    },
    {
      value: THEMES.dark,
      temp: true,
      icon: 'moon',
      label: messages.general[DARK],
    },
    {
      value: THEMES.system,
      temp: true,
      icon: 'twoTone',
      label: messages.general[DEFAULT],
    },
  ];
};
