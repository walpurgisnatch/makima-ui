import React from 'react';
import cn from 'classnames';

import { IHeaderActions } from './types';

import styles from './styles.module.scss';

export const HeaderActions = ({ title, className, children }: IHeaderActions) => {
  return (
    <div className={cn(className, 'd-flex justify-content-between align-items-center  p-2')}>
      <div className={styles.title}>{title}</div>
      {children && <div className={'d-flex justify-content-between align-items-center gap-2'}>{children}</div>}
    </div>
  );
};
