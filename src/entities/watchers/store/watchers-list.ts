import { createSlice } from '@reduxjs/toolkit';

import { defaultFulfilled, defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { watchersThunk } from '@entities/watchers';
import { TWatcher } from '../model/types';
import type { State } from '@shared/types';

const initialState: State<TWatcher[]> = {
  data: [],
  status: LoadingStatuses.Idle,
  error: null,
};

const watchersListSlice = createSlice({
  name: 'watchers',
  initialState,
  reducers: {
    resetWatchers: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(watchersThunk.select.fulfilled, defaultFulfilled);
    builder.addCase(watchersThunk.select.pending, defaultPending);
    builder.addCase(watchersThunk.select.rejected, defaultRejected);

    builder.addCase(watchersThunk.delete.fulfilled, (state, { payload }) => {
      state.data = state.data.filter((watcher) => watcher.name !== payload);
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(watchersThunk.delete.pending, defaultPending);
    builder.addCase(watchersThunk.delete.rejected, defaultRejected);
  },
});

export const { resetWatchers } = watchersListSlice.actions;

export const watchersListReducer = watchersListSlice.reducer;

export type WatcherListState = State<TWatcher[]>;
