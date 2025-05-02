import { useTranslation } from 'react-i18next';
import { locales } from '@shared/locale';

export const useLocale = () => {
  const { t, i18n } = useTranslation();
  const { enGB, ruRU } = locales;

  const locale = new Map();
  locale.set('ru-RU', ruRU);
  locale.set('en-GB', enGB);

  const _t = (value: string | undefined, args?: any): string => t(value ?? '', { ...args }) as string;

  return { locale: locale.get(i18n.language), t: _t, i18n, currentLng: i18n.language };
};
