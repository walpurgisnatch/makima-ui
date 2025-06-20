import { createSlice } from '@reduxjs/toolkit';

import { defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { widgetsThunk } from '../model';

import type { State } from '@shared/types';

interface IWidgetData {
  [key: string]: any;
}

const initialState: State<IWidgetData> = {
  data: {},
  status: LoadingStatuses.Idle,
  error: null,
};

export const widgetDataSlice = createSlice({
  name: 'widgetData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(widgetsThunk.fetchChartData.fulfilled, (state, { payload }: any) => {
      const newState = { ...state.data };
      newState[payload.widget] = payload.data;
      state.data = newState;
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(widgetsThunk.fetchChartData.pending, defaultPending);
    builder.addCase(widgetsThunk.fetchChartData.rejected, defaultRejected);
  },
});

export const widgetDataReducer = widgetDataSlice.reducer;
