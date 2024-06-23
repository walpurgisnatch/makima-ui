import React, { FC } from 'react';
import { Switch } from 'antd';
import cn from 'classnames';

import { DARK } from '@shared/constants';
import { ThemeToggleOptions } from './theme-toggle-constants';
import { useLocale, useTheme } from '@shared/hooks';
import { IThemeToggle } from './theme-toggle-types';

import styles from './theme-toggle.module.scss';

export const ThemeToggle: FC<IThemeToggle> = ({ className }) => {
  const { messages } = useLocale();
  const { theme, switchTheme } = useTheme();

  const themes = ThemeToggleOptions()
  const current = themes.find((option) => option.value === theme)?.temp 

  const onChange = (checked: boolean) => {
    const theme = themes.find((theme) => theme.temp === checked)?.value;
    theme && switchTheme(theme);
    console.log(theme)
  };

  return (
    <div className={cn(styles.themeToggleWrapper, className)}>
      <div className={styles.themeToggle}>
        <span>{messages.general[DARK]}</span>
        <Switch defaultChecked onChange={onChange} value={current} />
      </div>
    </div>
  );
};
