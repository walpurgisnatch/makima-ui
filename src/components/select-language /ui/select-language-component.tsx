import React, { FC } from 'react';
import { Select } from 'antd';
import cn from 'classnames';

import { useLocale } from '@shared/hooks';
import { ISelectLanguage } from './select-language-types';

import styles from './select-language.module.scss';

export const SelectLanguage: FC<ISelectLanguage> = ({ className }) => {
  const { currentLocale, locales, switchLocale } = useLocale();

  const options = Object.values(locales).map(({ code, title }) => ({
    value: code,
    label: title,
  }));

  const onChange = (value: string) => {
    switchLocale(value);
  };

  return (
    <div className={cn(styles.themeToggleWrapper, className)}>
      <div className={styles.themeToggle}>
        <Select defaultValue={currentLocale} onChange={onChange} options={options} />
      </div>
    </div>
  );
};
