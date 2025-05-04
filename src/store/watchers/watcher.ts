import { createSlice } from '@reduxjs/toolkit';

import type { State } from '@shared/types';
import { TWatcher } from './types';
import { defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { watchersThunk } from '@entities/watchers';

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
    builder.addCase(watchersThunk.get.fulfilled, (state, { payload }) => {
      const records = state.value.records;
      state.value = Array.isArray(payload) ? payload[0] : payload;
      if (records.length) state.value.records = records;
    });
    builder.addCase(watchersThunk.get.pending, defaultPending);
    builder.addCase(watchersThunk.get.rejected, defaultRejected);

    builder.addCase(watchersThunk.selectRecords.fulfilled, (state, { payload }) => {
      state.status = LoadingStatuses.Succeeded;
      state.value.records = payload;
    });
    builder.addCase(watchersThunk.selectRecords.pending, defaultPending);
    builder.addCase(watchersThunk.selectRecords.rejected, defaultRejected);
  },
});

export const watcherReducer = watcherSlice.reducer;
