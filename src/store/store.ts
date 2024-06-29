import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import { localesReducer } from './locales';

const rootReduser = combineReducers({
  locales: localesReducer,
});

export const store = configureStore({
  reducer: rootReduser,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
