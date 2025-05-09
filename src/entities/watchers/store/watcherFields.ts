import { createSlice } from '@reduxjs/toolkit';

import { defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { watchersThunk } from '@entities/watchers';
import type { State } from '@shared/types';
import { TFields } from '../model/types';

const initialState: State<TFields> = {
  data: {
    parser: [],
  },
  status: LoadingStatuses.Idle,
  error: null,
};

const watcherFields = createSlice({
  name: 'fields',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(watchersThunk.getParsers.fulfilled, (state, { type, payload }) => {
      const match = type.match(/parser/);

      const field = match && (match[0] as keyof TFields);

      if (field?.length && field in state.data) {
        state.data[field] = payload;
        state.status = LoadingStatuses.Succeeded;
      }
    });
    builder.addCase(watchersThunk.getParsers.pending, defaultPending);
    builder.addCase(watchersThunk.getParsers.rejected, defaultRejected);
  },
});

export const watcherFieldsReducer = watcherFields.reducer;
