import React from 'react';
import cn from 'classnames';

import { useLocale } from '@shared/hooks';

import styles from './styles.module.scss';

export const Empty = () => {
  const { t } = useLocale();

  return (
    <div className={cn(styles.empty, 'align-items-center d-flex justify-content-center')}>
      <div className={styles.icon}></div>
      <span>{t('general.empty')}</span>
    </div>
  );
};
