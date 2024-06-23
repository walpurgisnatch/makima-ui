import React from 'react';
import cn from 'classnames';

import { PLEASE_WAIT } from '@shared/constants';
import { useLocale } from '@shared/hooks';

import styles from './loader.module.scss';

export const Loader = () => {
  const { messages } = useLocale();

  return (
    <div className={cn(styles.loader, 'align-items-center d-flex justify-content-center')}>
      <div className={styles.icon}></div>
      {messages.general && <span>{messages.general[PLEASE_WAIT]}</span>}
    </div>
  );
};
