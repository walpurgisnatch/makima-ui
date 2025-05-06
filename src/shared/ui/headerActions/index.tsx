import React, { FC } from 'react';
import cn from 'classnames';

import { IHeaderActions } from './types';

import styles from './styles.module.scss';

export const HeaderActions: FC<IHeaderActions> = ({ title, className, children }) => {
  return (
    <div className={cn(className, 'd-inline-flex justify-content-between p-2')}>
      <h4 className={styles.title}>{title}</h4>
      <div className={'d-flex justify-content-between align-self-end align-items-center gap-2'}>{children}</div>
    </div>
  );
};
