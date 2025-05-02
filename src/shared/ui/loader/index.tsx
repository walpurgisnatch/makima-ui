import React from 'react';
import cn from 'classnames';

import { useLocale } from '@shared/hooks';

import styles from './styles.module.scss';

export const Loader = () => {
  const { t } = useLocale();

  return (
    <div className={cn(styles.loader, 'align-items-center d-flex justify-content-center')}>
      <div className={styles.icon}></div>
      <span>{t('general.please_wait')}</span>
    </div>
  );
};
