import React from 'react';
import { Table } from 'antd';

import { useLocale } from '@shared/hooks';
import { Panel } from '@shared/ui';
import { COLUMNS } from './records-panel-constants';
import { IRecordsPanelProps } from './records-panel-types';

export const RecordsPanel = ({ records }: IRecordsPanelProps) => {
  const { t } = useLocale();

  return (
    <Panel>
      <h2>{t('home.sentry')}</h2>

      <Table loading={false} columns={COLUMNS()} dataSource={records} rowKey={(record) => record.id} />
    </Panel>
  );
};
