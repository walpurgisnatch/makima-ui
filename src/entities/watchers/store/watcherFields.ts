import { createSlice } from '@reduxjs/toolkit';

import { defaultFulfilled, defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { watchersThunk } from '@entities/watchers';
import type { State } from '@shared/types';
import { TParser } from '../model/types';

const initialState: State<TParser[]> = {
  data: [],
  status: LoadingStatuses.Idle,
  error: null,
};

const watcherParser = createSlice({
  name: 'parser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(watchersThunk.getParsers.fulfilled, defaultFulfilled);
    builder.addCase(watchersThunk.getParsers.pending, defaultPending);
    builder.addCase(watchersThunk.getParsers.rejected, defaultRejected);
  },
});

export const watcherParserReducer = watcherParser.reducer;
