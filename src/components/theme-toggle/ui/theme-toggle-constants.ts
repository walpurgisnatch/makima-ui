import { DARK, LIGHT, SYSTEM, THEMES } from '@shared/constants';
import { useLocale } from '@shared/hooks';

export const ThemeToggleOptions = () => {
  const { messages } = useLocale();

  return [
    {
      value: THEMES.light,
      label: messages.general[LIGHT],
    },
    {
      value: THEMES.dark,
      label: messages.general[DARK],
    },
    {
      value: THEMES.system,
      label: messages.general[SYSTEM],
    },
  ];
};
