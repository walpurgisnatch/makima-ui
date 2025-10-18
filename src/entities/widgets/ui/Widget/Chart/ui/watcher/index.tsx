import React from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { useAppDispatch, useLocale } from '@shared/hooks';
import { TWatcher } from '@entities/watchers';
import { Panel } from '@shared/ui';

import styles from './styles.module.scss';

type TWatcherLineProps = {
  watcher: TWatcher;
}

export const WatcherWidget = ({ watcher }: TWatcherLineProps) => {
  const { t } = useLocale();
  const { watcherName } = useParams();
  const dispatch = useAppDispatch();

  return (
    <Panel className={styles.wrapper}>
      <div className={cn(styles.general, 'd-flex')}>
        <div className={styles.name}>{watcher.name}</div>
        <div className={styles.value}>{watcher.value}</div>
        <div className={styles.recordsStat}>
          <span>{watcher.recordsCount}</span>
          <span>{watcher.parsed}</span>
        </div>
      </div>
    </Panel>
  );
};
