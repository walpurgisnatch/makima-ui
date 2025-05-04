import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import { watcherReducer, watchersListReducer } from './watchers';
import { dashboardReducer, dashboardsListReducer } from './dashboards';

const rootReduser = combineReducers({
  watchersList: watchersListReducer,
  watcher: watcherReducer,
  dashboardsList: dashboardsListReducer,
  dashboard: dashboardReducer,
});

export const store = configureStore({
  reducer: rootReduser,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
