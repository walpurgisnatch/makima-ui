import { IWatcher } from './types';

export const watchersApi = {
  getWatchers: () => ({ url: '/watchers' }),
  createWatcher: (data: IWatcher) => ({ url: '/watchers', method: 'post', data }),
  deleteWatcher: (name: string) => ({ url: `/watchers/${name}`, method: 'delete' }),
  getWatcher: (name?: string) => ({ url: `/watchers/${name}` }),
  getRecords: (watcher?: string, limit?: number, offset?: number) => ({
    url: `/watchers/${watcher}/records`,
    params: {
      limit: limit,
      offset: offset,
    },
  }),
  getParsers: (type: string) => ({ url: `/watcher-parsers?type=${type}` }),
};
