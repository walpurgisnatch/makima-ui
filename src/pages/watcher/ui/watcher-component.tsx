import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { TITLE } from '@shared/constants';
import { useAppDispatch, useAppSelector, useLocale } from '@shared/hooks';
import { usePolling } from '@shared/hooks/usePolling';
import { getCurrentLoadingSelector, getCurrentWatcherRecordsSelector, getCurrentWatcherSelector, getWatcher, getWatcherRecords } from '@components/watchers';
import { resetCurrentWatcher } from '@store/watchers';
import { RecordsPanel } from '@widgets';

export const WatcherDetails = () => {
  const { messages } = useLocale();
  const { watcherName } = useParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getCurrentLoadingSelector);
  const watcher = useAppSelector(getCurrentWatcherSelector);
  const records = useAppSelector(getCurrentWatcherRecordsSelector);

  usePolling(() => dispatch(getWatcherRecords(watcherName)));

  useEffect(() => {
    dispatch(getWatcher(watcherName));
    dispatch(getWatcherRecords(watcherName))

    return () => {
      dispatch(resetCurrentWatcher());
    };
  }, [dispatch, watcherName]);


  return (
    <div>
      <h1>{watcher.name}</h1>

      <RecordsPanel records={records} />
    </div>
  );
};
