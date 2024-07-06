import { useLocale } from '@shared/hooks';
import { LAST_PARSED, NAME, RECORDS_COUNT, VALUE } from '@shared/constants';
import { TWatcher } from '@store/watchers';

export const COLUMNS = () => {
  const { messages } = useLocale();

  return [
    {
      dataIndex: 'name',
      key: 'name',
      title: messages.general[NAME],
      width: '25%',
      render: (text: TWatcher['name']) => text,
    },
    {
      dataIndex: 'value',
      key: 'value',
      title: messages.general[VALUE],
      render: (text: TWatcher['value']) => text,
    },
    {
      dataIndex: 'records',
      key: 'records',
      title: messages.watchers[RECORDS_COUNT],
      render: (text: TWatcher['records']) => text,
    },
    {
      dataIndex: 'parsed',
      key: 'parsed',
      title: messages.watchers[LAST_PARSED],
      render: (text: TWatcher['parsed']) => text,
    },
  ];
};
