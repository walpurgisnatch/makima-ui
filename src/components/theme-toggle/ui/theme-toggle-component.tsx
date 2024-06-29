import React, { FC } from 'react';
import { Select } from 'antd';
import cn from 'classnames';

import { ThemeToggleOptions } from './theme-toggle-constants';
import { useTheme } from '@shared/hooks';
import { IThemeToggle } from './theme-toggle-types';

import styles from './theme-toggle.module.scss';

export const ThemeToggle: FC<IThemeToggle> = ({ className }) => {
  const { theme, switchTheme } = useTheme();

  const themes = ThemeToggleOptions();

  const onChange = (value: string) => {
    switchTheme(value);
  };

  return (
    <div className={cn(styles.themeToggleWrapper, className)}>
      <div className={styles.themeToggle}>
        <Select defaultValue={theme} onChange={onChange} options={themes} />
      </div>
    </div>
  );
};
