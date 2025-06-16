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

export const widgetsListSlice = createSlice({
  name: 'widgetsList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(widgetsThunk.select.fulfilled, (state, { payload }) => {
      const widgets = payload.map((widget: any) => {
        return {
          ...widget,
          chartType: widget["chart-type"],
          widgetType: widget["widget-type"],
          styles: JSON.parse(widget.styles)
        }
      })
      state.data = widgets;
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(widgetsThunk.select.pending, defaultPending);
    builder.addCase(widgetsThunk.select.rejected, defaultRejected);
  },
});

export const WidgetsListReducer = widgetsListSlice.reducer;
