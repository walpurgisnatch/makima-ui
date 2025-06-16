import dayjs from 'dayjs';

import { LoadingStatuses } from '@shared/api';

export const isLoading = (status: string, checkIdle = false) =>
  status === LoadingStatuses.Loading ||
  status === LoadingStatuses.Pending ||
  (checkIdle && status === LoadingStatuses.Idle);

export const formatDate = (
  date?: string | number | Date,
  formatDate = 'YYYY-MM-DD HH:mm',
  defaultValue = '-',
  universal = true
): string => {
  if (typeof date === 'string' || typeof date === 'number' && universal) {
    date = (+date - 2208988800) * 1000; // universal-time to unix timestamp and * 1000 for milis
  }
  return date && dayjs(date).isValid() ? dayjs(date).format(formatDate) : defaultValue;
};
