import { createSlice } from '@reduxjs/toolkit';

import { defaultFulfilled, defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { IWidgetData, widgetsThunk } from '../model';

import type { State } from '@shared/types';

const initialState: State<IWidgetData> = {
  // @ts-ignore
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
    
    builder.addCase(widgetsThunk.fetchData.fulfilled, (state, { payload }) => {
      state.data.data = payload;
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(widgetsThunk.fetchData.pending, defaultPending);
    builder.addCase(widgetsThunk.fetchData.rejected, defaultRejected);
    
    builder.addCase(widgetsThunk.fetchWidgetData.fulfilled, (state, { payload }) => {
      state.data.data = payload;
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(widgetsThunk.fetchWidgetData.pending, defaultPending);
    builder.addCase(widgetsThunk.fetchWidgetData.rejected, defaultRejected);
  },
});

export const widgetReducer = widgetSlice.reducer;
