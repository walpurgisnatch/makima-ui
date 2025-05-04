export enum URLS {
  Home = 'home',
  CreateWatcher = 'create-watcher',
  Watchers = 'watchers',
  Dashboards = 'dashboards',
}

export enum ROUTE_IDS {
  watcherDetails = 'watcherDetails',
  dashboard = 'dashboard',
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
  Dashboards: {
    title: 'Dashboards',
    url: URLS.Dashboards,
  },
};
