import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import { localesReducer } from './locales';
import { watchersReducer } from './watchers';

const rootReduser = combineReducers({
  locales: localesReducer,
  watchers: watchersReducer,
});

export const store = configureStore({
  reducer: rootReduser,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
