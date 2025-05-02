import { useLocale } from '@shared/hooks';
import { TWatcher } from '@store/watchers';

export const COLUMNS = () => {
  const { t } = useLocale();

  return [
    {
      dataIndex: 'name',
      key: 'name',
      title: t('general.name'),
      width: '25%',
      render: (text: TWatcher['name']) => text,
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
      title: t('watchers.record_count'),
      render: (text: TWatcher['recordsCount']) => text,
    },
    {
      dataIndex: 'parsed',
      key: 'parsed',
      title: t('watchers.last_parsed'),
      render: (text: TWatcher['parsed']) => text,
    },
  ];
};
