import React, { useEffect } from 'react';
import { Table } from 'antd';

import { SENTRY } from '@shared/constants';
import { useAppDispatch, useAppSelector, useLocale } from '@shared/hooks';
import { Panel } from '@shared/ui';
import { usePolling } from '@shared/hooks/usePolling';
import { COLUMNS } from './watchers-panel-constants';
import { getWatchers, getWatchersLoadingSelector, getWatchersSelector } from '@components/watchers';
import { resetWatchers } from '@store/watchers';

export const WatchersPanel = () => {
  const { messages } = useLocale();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getWatchersLoadingSelector);
  const dataSource = useAppSelector(getWatchersSelector);

  usePolling(() => dispatch(getWatchers()));

  useEffect(() => {
    dispatch(getWatchers());

    return () => {
      dispatch(resetWatchers());
    };
  }, [dispatch]);

  return (
    <Panel>
      <h2>{messages.pages.dashboard[SENTRY]}</h2>

      <Table loading={isLoading} columns={COLUMNS()} dataSource={dataSource} rowKey={(watcher) => watcher.name} />
    </Panel>
  );
};
