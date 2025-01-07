import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ThemeToggle } from '@components/theme-toggle';
import { SelectLanguage } from '@components/select-language ';

import styles from './header.module.scss';

export const Header = () => {
  return (
    <div className={cn(styles.header, 'd-flex align-items-center justify-content-between')}>
      <div className={styles.logo}>
        <Link to='/' className={styles.link}>Makima UI</Link>
      </div>
      <div className={cn(styles.features, 'd-flex ml-auto')}>
        <ThemeToggle />
        <SelectLanguage />
      </div>
    </div>
  );
};
