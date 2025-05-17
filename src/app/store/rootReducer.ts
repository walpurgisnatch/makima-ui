import { combineReducers } from '@reduxjs/toolkit';

import { dashboardReducer, dashboardsListReducer } from '@entities/dashboards';
import { watcherReducer, watchersListReducer, watcherFieldsReducer } from '@entities/watchers';
import { WidgetListReducer, widgetReducer } from '@entities/widgets';

const rootReducer = combineReducers({
  watchersList: watchersListReducer,
  watcher: watcherReducer,
  dashboardsList: dashboardsListReducer,
  dashboard: dashboardReducer,
  widgetList: WidgetListReducer,
  widget: widgetReducer,
  fields: watcherFieldsReducer,
});

export default rootReducer;
