import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { watchersThunk } from '@entities/watchers';
import type { State } from '@shared/types';
import { TWatcherFields, THandlers, TFieldData } from '../model/types';

const initialState: State<TWatcherFields> = {
  data: {
    parser: [],
    handlers: {
      predicates: [],
      actions: [],
    },
  },
  status: LoadingStatuses.Idle,
  error: null,
};

const watcherFields = createSlice({
  name: 'fields',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(watchersThunk.getParsers.fulfilled, (state, { payload }: PayloadAction<TFieldData[]>) => {
      state.data.parser = payload;
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(watchersThunk.getParsers.pending, defaultPending);
    builder.addCase(watchersThunk.getParsers.rejected, defaultRejected);

    builder.addCase(watchersThunk.getHandlersData.fulfilled, (state, { payload }: PayloadAction<THandlers>) => {
      state.data.handlers.actions = payload.actions;
      state.data.handlers.predicates = payload.predicates;
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(watchersThunk.getHandlersData.pending, defaultPending);
    builder.addCase(watchersThunk.getHandlersData.rejected, defaultRejected);
  },
});

export const watcherFieldsReducer = watcherFields.reducer;
