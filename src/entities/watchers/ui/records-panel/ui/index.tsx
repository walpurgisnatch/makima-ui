import React from 'react';
import { Table } from 'antd';

import { Panel } from '@shared/ui';
import { COLUMNS } from './constants';
import { IRecordsPanelProps } from './types';

export const RecordsPanel = ({ records }: IRecordsPanelProps) => {
  return (
    <Panel>
      <Table loading={false} columns={COLUMNS()} dataSource={records} rowKey={(record) => record.id} />
    </Panel>
  );
};
