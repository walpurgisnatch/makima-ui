import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@widgets';

import styles from './content-layout.module.scss';

export const ContentLayout = () => {
  return (
    <div className={styles.contentLayout}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
