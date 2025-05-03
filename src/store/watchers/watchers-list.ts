import { createSlice } from '@reduxjs/toolkit';

import { defaultFulfilled, defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { deleteWatcher, getWatchers } from '@entities/watchers';
import { TWatcher } from './watcher-types';
import type { State } from '@shared/types';

const initialState: State<TWatcher[]> = {
  value: [],
  status: LoadingStatuses.Idle,
  error: null,
};

const watchersListSlice = createSlice({
  name: 'watchers',
  initialState,
  reducers: {
    resetWatchers: (state) => {
      state.value = initialState.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWatchers.fulfilled, defaultFulfilled);
    builder.addCase(getWatchers.pending, defaultPending);
    builder.addCase(getWatchers.rejected, defaultRejected);

    builder.addCase(deleteWatcher.fulfilled, (state, { payload }) => {
      state.value = state.value.filter((watcher) => watcher.name !== payload);
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(deleteWatcher.pending, defaultPending);
    builder.addCase(deleteWatcher.rejected, defaultRejected);
  },
});

export const { resetWatchers } = watchersListSlice.actions;

export const watchersListReducer = watchersListSlice.reducer;
