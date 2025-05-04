import { useLocale } from '@shared/hooks';
import { TWatcher } from '@entities/watchers/store';
import { formatDate } from '@shared/lib';

export const COLUMNS = () => {
  const { t } = useLocale();

  return [
    {
      dataIndex: 'id',
      key: 'id',
      title: t('general.id'),
      width: '25%',
      render: (text: TWatcher['name']) => text,
    },
    {
      dataIndex: 'value',
      key: 'value',
      title: t('general.value'),
      render: (text: TWatcher['recordsCount']) => text,
    },
    {
      dataIndex: 'timestamp',
      key: 'timestamp',
      title: t('general.parsed'),
      render: (text: TWatcher['parsed']) => formatDate(text),
    },
  ];
};
