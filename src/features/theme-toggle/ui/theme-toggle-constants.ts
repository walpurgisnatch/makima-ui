import { THEMES } from '@shared/constants';
import { useLocale } from '@shared/hooks';

export const ThemeToggleOptions = () => {
  const { t } = useLocale();

  return [
    {
      value: THEMES.light,
      label: t('general.light'),
    },
    {
      value: THEMES.dark,
      label: t('general.dark'),
    },
    {
      value: THEMES.system,
      label: t('general.system'),
    },
  ];
};
