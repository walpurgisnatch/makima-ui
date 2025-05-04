import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import { useLocale } from '@shared/hooks';
import { TDashboard } from '@entities/dashboards/store';

import styles from './styles.module.scss';

export const COLUMNS = (
  deleteDashboardHandler: (name: string) => void,
  editDashboardHandler: (name: string) => void
) => {
  const { t } = useLocale();

  return [
    {
      dataIndex: 'name',
      key: 'name',
      title: t('general.name'),
      width: '15%',
      render: (name: TDashboard['name']) => (
        <Link className={styles.link} to={`/dashboards/${name}`}>
          {name}
        </Link>
      ),
    },
    {
      dataIndex: 'description',
      key: 'description',
      title: t('general.value'),
      render: (text: TDashboard['description']) => text,
    },
    {
      key: 'actions',
      title: t('general.actions'),
      className: styles.actions,
      render: (dashboard: TDashboard) => (
        <div>
          <Tooltip mouseEnterDelay={0.5} title={t('general.edit')}>
            <Button type='link' className={styles.icon} onClick={() => editDashboardHandler(dashboard.name)}>
              <EditOutlined />
            </Button>
          </Tooltip>
          <Tooltip mouseEnterDelay={0.5} title={t('general.delete')}>
            <Button type='link' className={styles.icon} onClick={() => deleteDashboardHandler(dashboard.name)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
};
