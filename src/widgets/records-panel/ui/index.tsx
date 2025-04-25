import React from 'react';
import { Table } from 'antd';

import { SENTRY } from '@shared/constants';
import { useLocale } from '@shared/hooks';
import { Panel } from '@shared/ui';
import { COLUMNS } from './records-panel-constants';
import { IRecordsPanelProps } from './records-panel-types';

export const RecordsPanel = ({ records }: IRecordsPanelProps) => {
  const { messages } = useLocale();

  return (
    <Panel>
      <h2>{messages.pages.home[SENTRY]}</h2>

      <Table loading={false} columns={COLUMNS()} dataSource={records} rowKey={(record) => record.id} />
    </Panel>
  );
};
