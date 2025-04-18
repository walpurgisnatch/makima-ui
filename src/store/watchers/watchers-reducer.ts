import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IInitialState, TRecord, TWatcher } from './watchers-types';

const initialState: IInitialState = {
  isLoading: false,
  watchers: [],
  currentLoading: false,
  currentWatcher: {
    name: '',
    value: '',
    parsed: '',
    recordsCount: 0,
    records: [],
  },
};

const watchersSlice = createSlice({
  name: 'watchers',
  initialState,
  reducers: {
    setWatchersLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setWatchers: (state, action: PayloadAction<TWatcher[]>) => {
      state.watchers = action.payload;
    },
    resetWatchers: (state) => {
      state.watchers = initialState.watchers;
    },
    setCurrentLoading: (state, action: PayloadAction<boolean>) => {
      state.currentLoading = action.payload;
    },
    setCurrentWatcher: (state, action: PayloadAction<TWatcher>) => {
      let records;
      if (state.currentWatcher.records.length) {
        records = state.currentWatcher.records;
      }
      state.currentWatcher = action.payload;
      state.currentWatcher.records = records || [];
    },
    setCurrentWatcherRecords: (state, action: PayloadAction<TRecord[]>) => {
      state.currentWatcher.records = action.payload;
    },
    resetCurrentWatcher: (state) => {
      state.currentWatcher = initialState.currentWatcher;
    },
  },
});

export const {
  setWatchers,
  setWatchersLoading,
  resetWatchers,
  setCurrentLoading,
  setCurrentWatcher,
  resetCurrentWatcher,
  setCurrentWatcherRecords,
} = watchersSlice.actions;

export const watchersReducer = watchersSlice.reducer;
