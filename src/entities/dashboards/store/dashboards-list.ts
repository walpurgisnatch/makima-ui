import { createSlice } from '@reduxjs/toolkit';

import { defaultFulfilled, defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { dashboardsThunk } from '@entities/dashboards';
import { TDashboard } from '../model/types';
import type { State } from '@shared/types';

const initialState: State<TDashboard[]> = {
  data: [],
  status: LoadingStatuses.Idle,
  error: null,
};

const dashboardsListSlice = createSlice({
  name: 'dashboards',
  initialState,
  reducers: {
    resetDashboards: (state) => {
      state.data = initialState.data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(dashboardsThunk.getAll.fulfilled, defaultFulfilled);
    builder.addCase(dashboardsThunk.getAll.pending, defaultPending);
    builder.addCase(dashboardsThunk.getAll.rejected, defaultRejected);

    builder.addCase(dashboardsThunk.delete.fulfilled, (state, { payload }) => {
      state.data = state.data.filter((dashboard) => dashboard.name !== payload);
      state.status = LoadingStatuses.Succeeded;
    });
    builder.addCase(dashboardsThunk.delete.pending, defaultPending);
    builder.addCase(dashboardsThunk.delete.rejected, defaultRejected);
  },
});

export const { resetDashboards } = dashboardsListSlice.actions;

export const dashboardsListReducer = dashboardsListSlice.reducer;

export type DashboardListState = State<TDashboard[]>;
