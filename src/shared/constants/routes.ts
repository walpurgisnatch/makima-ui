export enum URLS {
  Home = 'Home',
  CreateWatcher = 'create-watcher',
}

export enum ROUTE_IDS {
  watcherDetails = 'watcherDetails',
}

export const ROUTES = {
  Home: {
    title: 'Home',
    url: URLS.Home,
  },
  CreateWatcher: {
    title: 'CreateWatcher',
    url: URLS.CreateWatcher,
  },
};
