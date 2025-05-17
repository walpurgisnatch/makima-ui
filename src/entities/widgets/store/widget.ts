import { createSlice } from '@reduxjs/toolkit';

import { defaultFulfilled, defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { IWidgetData, widgetsThunk } from '../model';

import type { State } from '@shared/types';

const initialState: State<IWidgetData> = {
  data: {},
  status: LoadingStatuses.Idle,
  error: null,
};

export const widgetSlice = createSlice({
  name: 'widget',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(widgetsThunk.get.fulfilled, defaultFulfilled);
    builder.addCase(widgetsThunk.get.pending, defaultPending);
    builder.addCase(widgetsThunk.get.rejected, defaultRejected);
  },
});

export const widgetReducer = widgetSlice.reducer;
