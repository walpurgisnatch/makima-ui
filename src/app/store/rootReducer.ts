import { combineReducers } from '@reduxjs/toolkit';

import { dashboardReducer, dashboardsListReducer } from '@entities/dashboards';
import { watcherReducer, watchersListReducer, watcherParserReducer } from '@entities/watchers';

const rootReducer = combineReducers({
  watchersList: watchersListReducer,
  watcher: watcherReducer,
  dashboardsList: dashboardsListReducer,
  dashboard: dashboardReducer,
  parser: watcherParserReducer,
});

export default rootReducer;
