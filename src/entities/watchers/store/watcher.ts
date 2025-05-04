import { createSlice } from '@reduxjs/toolkit';

import type { State } from '@shared/types';
import { TWatcher } from '../model/types';
import { defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { watchersThunk } from '@entities/watchers';

const initialState: State<TWatcher> = {
  data: {
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
    builder.addCase(watchersThunk.get.fulfilled, (state, { payload }) => {
      const records = state.data.records;
      state.data = Array.isArray(payload) ? payload[0] : payload;
      if (records.length) state.data.records = records;
    });
    builder.addCase(watchersThunk.get.pending, defaultPending);
    builder.addCase(watchersThunk.get.rejected, defaultRejected);

    builder.addCase(watchersThunk.selectRecords.fulfilled, (state, { payload }) => {
      state.status = LoadingStatuses.Succeeded;
      state.data.records = payload;
    });
    builder.addCase(watchersThunk.selectRecords.pending, defaultPending);
    builder.addCase(watchersThunk.selectRecords.rejected, defaultRejected);
  },
});

export const watcherReducer = watcherSlice.reducer;

export type WatcherState = State<TWatcher>;
