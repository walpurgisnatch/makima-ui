import { createSlice } from '@reduxjs/toolkit';

import type { State } from '@shared/types';
import { TWatcher } from './watcher-types';
import { defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { getWatcher, getWatcherRecords } from '@entities/watchers';

const initialState: State<TWatcher> = {
  value: {
    name: '',
    value: '',
    parsed: '',
    recordsCount: 0,
    records: [],
  },
  status: LoadingStatuses.Idle,
  error: null,
};

const watcherSlice = createSlice({
  name: 'watchers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWatcher.fulfilled, (state, { payload }) => {
      const records = state.value.records;
      state.value = Array.isArray(payload) ? payload[0] : payload;
      if (records.length) state.value.records = records;
    });
    builder.addCase(getWatcher.pending, defaultPending);
    builder.addCase(getWatcher.rejected, defaultRejected);

    builder.addCase(getWatcherRecords.fulfilled, (state, { payload }) => {
      state.status = LoadingStatuses.Succeeded;
      state.value.records = payload;
    });
    builder.addCase(getWatcherRecords.pending, defaultPending);
    builder.addCase(getWatcherRecords.rejected, defaultRejected);
  },
});

export const watcherReducer = watcherSlice.reducer;
