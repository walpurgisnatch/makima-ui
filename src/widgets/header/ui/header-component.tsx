import React from 'react';
import cn from 'classnames';

import { ThemeToggle } from '@components/theme-toggle';
import { SelectLanguage } from '@components/select-language ';

import styles from './header.module.scss';

export const Header = () => {
  return (
    <div className={cn(styles.header, 'd-flex align-items-center justify-content-between')}>
      <div className={styles.logo}>Makima UI</div>
      <div className={cn(styles.features, 'd-flex ml-auto')}>
        <ThemeToggle />
        <SelectLanguage />
      </div>
    </div>
  );
};
