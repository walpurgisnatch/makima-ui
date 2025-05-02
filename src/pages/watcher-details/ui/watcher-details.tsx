import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { useAppDispatch, useAppSelector, useLocale, usePolling } from '@shared/hooks';
import {
  selectWatcherRecords,
  selectWatcher,
  getWatcher,
  getWatcherRecords,
  selectWatcherStatus,
} from '@entities/watchers';
import { RecordsPanel } from '@widgets';
import { Loader, Panel } from '@shared/ui';
import { isLoading } from '@shared/lib';

import styles from './styles.module.scss';

export const WatcherDetails = () => {
  const { t } = useLocale();
  const { watcherName } = useParams();
  const dispatch = useAppDispatch();
  const loading = isLoading(useAppSelector(selectWatcherStatus));
  const watcher = useAppSelector(selectWatcher);
  const records = useAppSelector(selectWatcherRecords);

  const properties = [
    { key: 'watchers.current_value', value: watcher.value },
    { key: 'watchers.records_count', value: watcher.recordsCount },
    { key: 'watchers.last_parsed', value: watcher.parsed },
  ];

  usePolling(() => watcherName && dispatch(getWatcherRecords(watcherName)));

  useEffect(() => {
    if (watcherName) {
      dispatch(getWatcher(watcherName));
      dispatch(getWatcherRecords(watcherName));
    }
  }, [dispatch, watcherName]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{watcher.name}</h1>

      <Panel>
        <div className={cn(styles.properties, 'd-flex')}>
          {properties.map((prop, inx) => (
            <div key={inx} className={cn(styles.column, 'd-flex flex-column')}>
              {/* @ts-ignore */}
              <div className={styles.header}>{t(prop.key)}</div>
              <div>{prop.value}</div>
            </div>
          ))}
        </div>
      </Panel>

      <h2>{t('general.records')}</h2>
      <RecordsPanel records={records} />
    </div>
  );
};
