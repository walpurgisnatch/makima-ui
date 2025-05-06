import React, { FC, useMemo } from 'react';
import { Select } from 'antd';
import cn from 'classnames';

import { useLocale } from '@shared/hooks';
import { Language, list } from '@shared/locale';
import { ISelectLanguage } from './select-language-types';

import styles from './styles.module.scss';

export const SelectLanguage: FC<ISelectLanguage> = ({ className }) => {
  const { t, currentLng, i18n } = useLocale();

  const options = useMemo(() => list.map((lang) => ({ value: lang, label: t(`general.languages.${lang}`) })), [t]);

  const onChange = (lng: string) => {
    i18n.changeLanguage(lng as Language).then(() => location.reload());
  };

  return (
    <div className={cn(styles.themeToggleWrapper, className)}>
      <div className={styles.themeToggle}>
        <Select defaultValue={currentLng} onChange={onChange} options={options} />
      </div>
    </div>
  );
};
