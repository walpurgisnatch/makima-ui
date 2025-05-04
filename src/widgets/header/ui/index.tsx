import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { ThemeToggle } from '@features/theme-toggle';
import { SelectLanguage } from '@features/select-language ';

import styles from './header.module.scss';
import { useLocale } from '@shared/hooks';
import { URLS } from '@shared/constants';

export const Header = () => {
  const { t } = useLocale();

  return (
    <div className={cn(styles.header, 'd-flex align-items-center justify-content-between')}>
      <div className={styles.logo}>
        <Link to='/' className={styles.link}>
          Makima UI
        </Link>
      </div>
      <div className={styles.navigation}>
        <Link to={`/${URLS.Dashboards}`} className={styles.link}>
          {t('dashboards.title')}
        </Link>
      </div>
      <div className={cn(styles.features, 'd-flex ml-auto')}>
        <ThemeToggle />
        <SelectLanguage />
      </div>
    </div>
  );
};
