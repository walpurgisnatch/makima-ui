import { combineReducers } from '@reduxjs/toolkit';

import { dashboardReducer, dashboardsListReducer } from '@entities/dashboards';
import { watcherReducer, watchersListReducer, watcherFieldsReducer } from '@entities/watchers';

const rootReducer = combineReducers({
  watchersList: watchersListReducer,
  watcher: watcherReducer,
  dashboardsList: dashboardsListReducer,
  dashboard: dashboardReducer,
  fields: watcherFieldsReducer,
});

export default rootReducer;
