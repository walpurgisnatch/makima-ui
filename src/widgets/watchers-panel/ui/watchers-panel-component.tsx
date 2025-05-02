import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';

import { useAppDispatch, useAppSelector, useLocale } from '@shared/hooks';
import { Panel } from '@shared/ui';
import { usePolling } from '@shared/hooks/usePolling';
import { COLUMNS } from './watchers-panel-constants';
import { getWatchers, selectWatchersStatus, selectWatchers } from '@entities/watchers';
import { isLoading } from '@shared/lib';
import { resetWatchers } from '@store/watchers';

export const WatchersPanel = () => {
  const { t } = useLocale();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = isLoading(useAppSelector(selectWatchersStatus));
  const dataSource = useAppSelector(selectWatchers);

  usePolling(() => dispatch(getWatchers()));

  useEffect(() => {
    dispatch(getWatchers());

    return () => {
      dispatch(resetWatchers);
    };
  }, [dispatch]);

  return (
    <Panel>
      <h2>{t('pages.home.sentry')}</h2>

      <Table
        loading={loading}
        columns={COLUMNS()}
        dataSource={dataSource}
        rowKey={(watcher) => watcher.name}
        onRow={(watcher) => {
          return {
            onClick: () => navigate(`../${watcher.name}`),
          };
        }}
      />
    </Panel>
  );
};
