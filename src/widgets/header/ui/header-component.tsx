import React from 'react';
import cn from 'classnames';

import { ThemeToggle } from '@components/theme-toggle';

import styles from './header.module.scss';

export const Header = () => {
  return (
    <div className={cn(styles.header, 'd-flex')}>
      <div className={cn(styles.features, 'd-flex ml-auto')}>
        <ThemeToggle />
      </div>
    </div>
  );
};
