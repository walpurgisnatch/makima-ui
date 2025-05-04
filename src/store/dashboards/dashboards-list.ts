import { createSlice } from '@reduxjs/toolkit';

import { defaultFulfilled, defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { dashboardsThunk } from '@entities/dashboards';
import { TDashboard } from './types';
import type { State } from '@shared/types';

const initialState: State<TDashboard[]> = {
  value: [],
  status: LoadingStatuses.Idle,
  error: null,
};

const dashboardsListSlice = createSlice({
  name: 'dashboards',
  initialState,
  reducers: {
    resetDashboards: (state) => {
      state.value = initialState.value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(dashboardsThunk.getAll.fulfilled, defaultFulfilled);
    builder.addCase(dashboardsThunk.getAll.pending, defaultPending);
    builder.addCase(dashboardsThunk.getAll.rejected, defaultRejected);

    builder.addCase(dashboardsThunk.delete.fulfilled, (state, { payload }) => {
      state.value = state.value.filter((dashboard) => dashboard.name !== payload);
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(dashboardsThunk.delete.pending, defaultPending);
    builder.addCase(dashboardsThunk.delete.rejected, defaultRejected);
  },
});

export const { resetDashboards } = dashboardsListSlice.actions;

export const dashboardsListReducer = dashboardsListSlice.reducer;
