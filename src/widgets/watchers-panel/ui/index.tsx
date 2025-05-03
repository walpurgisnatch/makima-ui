import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector, useLocale } from '@shared/hooks';
import { Panel } from '@shared/ui';
import { usePolling } from '@shared/hooks/usePolling';
import { COLUMNS } from './watchers-panel-constants';
import { getWatchers, selectWatchersStatus, selectWatchers, deleteWatcher } from '@entities/watchers';
import { isLoading } from '@shared/lib';
import { resetWatchers } from '@store/watchers';

export const WatchersPanel = () => {
  const { t } = useLocale();
  const dispatch = useAppDispatch();
  const loading = isLoading(useAppSelector(selectWatchersStatus));
  const dataSource = useAppSelector(selectWatchers);

  usePolling(() => dispatch(getWatchers()));

  useEffect(() => {
    dispatch(getWatchers());

    return () => {
      dispatch(resetWatchers);
    };
  }, [dispatch]);

  const deleteWatcherHandler = (name: string) => {
    dispatch(deleteWatcher(name));
  };

  return (
    <Panel>
      <h2>{t('home.sentry')}</h2>
      <Link to={'/create-watcher'}>
        <PlusOutlined />
      </Link>

      <Table
        loading={loading}
        columns={COLUMNS(deleteWatcherHandler)}
        dataSource={dataSource}
        rowKey={(watcher) => watcher.name}
      />
    </Panel>
  );
};
