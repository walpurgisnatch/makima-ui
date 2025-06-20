import { createSlice } from '@reduxjs/toolkit';

import { widgetsThunk } from '../model/thunk';
import { defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';

import type { State } from '@shared/types';
import type { IWidget } from '../model/types';

const initialState: State<IWidget[]> = {
  data: [],
  status: LoadingStatuses.Idle,
  error: null,
};

export const widgetsListSlice = createSlice({
  name: 'widgetsList',
  initialState,
  reducers: {
    resetWidgets: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(widgetsThunk.select.fulfilled, (state, { payload }) => {
      const widgets = payload.map((widget: any) => {
        return {
          ...widget,
          styles: JSON.parse(widget.styles),
        };
      });
      state.data = widgets;
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(widgetsThunk.select.pending, defaultPending);
    builder.addCase(widgetsThunk.select.rejected, defaultRejected);

    builder.addCase(widgetsThunk.delete.fulfilled, (state, { payload }) => {
      const widgets = state.data.filter((widget) => widget.id !== payload);
      state.data = widgets;
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(widgetsThunk.delete.pending, defaultPending);
    builder.addCase(widgetsThunk.delete.rejected, defaultRejected);

    // @ts-ignore
    builder.addCase(widgetsThunk.updateOrder.fulfilled, (state, { payload }: { payload: IWidget[] }) => {
      const widgets = [...state.data];
      payload.forEach((widget) => {
        const t = widgets.find((w) => w.id === widget.id);
        if (t) t.order = widget.order;
      });
      state.data = widgets;
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(widgetsThunk.updateOrder.pending, defaultPending);
    builder.addCase(widgetsThunk.updateOrder.rejected, defaultRejected);
  },
});

export const { resetWidgets } = widgetsListSlice.actions;

export const WidgetsListReducer = widgetsListSlice.reducer;
