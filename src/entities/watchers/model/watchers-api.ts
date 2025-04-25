import { TRecord } from '@store/watchers/watchers-types';
import { axiosInstance } from '@shared/api';
import { TWatcher } from '@store/watchers';

export const watchersApi = {
  getWatchers: () => axiosInstance.get<TWatcher[]>('/watchers'),
  getWatcher: (name?: string) => axiosInstance.get<TWatcher>(`/${name}`),
  getRecords: (watcher?: string, limit?: number, offset?: number) =>
    axiosInstance.get<TRecord[]>(`/${watcher}/records`, {
      params: {
        limit: limit,
        offset: offset,
      },
    }),
};
