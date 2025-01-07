import { useLocale } from '@shared/hooks';
import { VALUE, ID, PARSED } from '@shared/constants';
import { TWatcher } from '@store/watchers';

export const COLUMNS = () => {
  const { messages, toLocaleDate } = useLocale();

  return [
    {
      dataIndex: 'id',
      key: 'id',
      title: messages.general[ID],
      width: '25%',
      render: (text: TWatcher['name']) => text,
    },
    {
      dataIndex: 'value',
      key: 'value',
      title: messages.general[VALUE],
      render: (text: TWatcher['recordsCount']) => text,
    },
    {
      dataIndex: 'timestamp',
      key: 'timestamp',
      title: messages.general[PARSED],
      render: (text: TWatcher['parsed']) => text,
    },
  ];
};
