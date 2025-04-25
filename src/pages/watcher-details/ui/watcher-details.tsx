import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { useAppDispatch, useAppSelector, useLocale } from '@shared/hooks';
import { usePolling } from '@shared/hooks/usePolling';
import {
  getCurrentWatcherRecordsSelector,
  getCurrentWatcherSelector,
  getWatcher,
  getWatcherRecords,
} from '@entities/watchers';
import { resetCurrentWatcher } from '@store/watchers';
import { RecordsPanel } from '@widgets';
import { CURRENT_VALUE, LAST_PARSED, RECORDS, RECORDS_COUNT } from '@shared/constants';
import { Panel } from '@shared/ui';

import styles from './styles.module.scss';

export const WatcherDetails = () => {
  const { messages } = useLocale();
  const { watcherName } = useParams();
  const dispatch = useAppDispatch();
  // const isLoading = useAppSelector(getCurrentLoadingSelector);
  const watcher = useAppSelector(getCurrentWatcherSelector);
  const records = useAppSelector(getCurrentWatcherRecordsSelector);

  const properties = [
    { key: CURRENT_VALUE, value: watcher.value },
    { key: RECORDS_COUNT, value: watcher.recordsCount },
    { key: LAST_PARSED, value: watcher.parsed },
  ];

  usePolling(() => dispatch(getWatcherRecords(watcherName)));

  useEffect(() => {
    dispatch(getWatcher(watcherName));
    dispatch(getWatcherRecords(watcherName));

    return () => {
      dispatch(resetCurrentWatcher());
    };
  }, [dispatch, watcherName]);

  return (
    <div>
      <h1>{watcher.name}</h1>

      <Panel>
        <div className={cn(styles.properties, 'd-flex')}>
          {properties.map((prop) => (
            <div className={cn(styles.column, 'd-flex flex-column')}>
              {/* @ts-ignore */}
              <div className={styles.header}>{messages.watchers[prop.key]}</div>
              <div>{prop.value}</div>
            </div>
          ))}
        </div>
      </Panel>

      <h2>{messages.general[RECORDS]}</h2>
      <RecordsPanel records={records} />
    </div>
  );
};
