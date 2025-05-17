import { createSlice } from '@reduxjs/toolkit';

import { widgetsThunk } from '../model/thunk';
import { defaultFulfilled, defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import type { State } from '@shared/types';
import type { IWidgetData } from '../model/types';

const initialState: State<IWidgetData[]> = {
  data: [],
  status: LoadingStatuses.Idle,
  error: null,
};

export const widgetListSlice = createSlice({
  name: 'widgetList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(widgetsThunk.select.fulfilled, defaultFulfilled);
    builder.addCase(widgetsThunk.select.pending, defaultPending);
    builder.addCase(widgetsThunk.select.rejected, defaultRejected);

    builder.addCase(widgetsThunk.fetchData.fulfilled, (state, { payload }) => {
      const newData = { ...state.data }
      const { id, data } = payload;
      const widget = state.data.findIndex((widget) => widget.id === id);
      newData[widget].data = data;
      state.data = newData;
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(widgetsThunk.fetchData.pending, defaultPending);
    builder.addCase(widgetsThunk.fetchData.rejected, defaultRejected);
  },
});

export const WidgetListReducer = widgetListSlice.reducer;
