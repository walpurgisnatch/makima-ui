import React, { FC, PropsWithChildren } from 'react';

import styles from './styles.module.scss';

export const Panel: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.panel}>{children}</div>;
};
