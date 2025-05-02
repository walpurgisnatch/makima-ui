export const watchersApi = {
  getWatchers: () => ({ url: '/watchers' }),
  getWatcher: (name?: string) => ({ url: `/watchers/${name}` }),
  getRecords: (watcher?: string, limit?: number, offset?: number) => ({
    url: `/watchers/${watcher}/records`,
    params: {
      limit: limit,
      offset: offset,
    },
  }),
};
