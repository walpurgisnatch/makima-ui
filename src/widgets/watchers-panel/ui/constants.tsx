import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Tooltip } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useLocale } from '@shared/hooks';
import { TWatcher } from '@entities/watchers/store';

import styles from './styles.module.scss';

export const COLUMNS = (deleteWatcherHandler: (name: string) => void) => {
  const { t } = useLocale();

  return [
    {
      dataIndex: 'name',
      key: 'name',
      title: t('general.name'),
      render: (name: TWatcher['name']) => (
        <Link className={styles.link} to={`/watchers/${name}`}>
          {name}
        </Link>
      ),
    },
    {
      dataIndex: 'value',
      key: 'value',
      title: t('general.value'),
      render: (text: TWatcher['value']) => text,
    },
    {
      dataIndex: 'recordsCount',
      key: 'recordsCount',
      title: t('watchers.records_count'),
      render: (text: TWatcher['recordsCount']) => text,
    },
    {
      dataIndex: 'interval',
      key: 'interval',
      title: t('watchers.interval'),
      render: (text: TWatcher['interval']) => text,
    },
    {
      dataIndex: 'parsed',
      key: 'parsed',
      title: t('watchers.last_parsed'),
      render: (text: TWatcher['parsed']) => text,
    },
    {
      key: 'actions',
      className: styles.actions,
      render: (watcher: TWatcher) => (
        <div>
          <Tooltip mouseEnterDelay={0.5} title={t('general.delete')}>
            <Button type='link' className={styles.icon} onClick={() => deleteWatcherHandler(watcher.name)}>
              <DeleteOutlined />
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
};
