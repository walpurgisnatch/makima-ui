import { createSlice } from '@reduxjs/toolkit';

import type { State } from '@shared/types';
import { TDashboard } from './types';
import { defaultFulfilled, defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { dashboardsThunk } from '@entities/dashboards';

const initialState: State<TDashboard> = {
  value: {
    name: '',
    description: '',
  },
  status: LoadingStatuses.Idle,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(dashboardsThunk.get.fulfilled, defaultFulfilled);
    builder.addCase(dashboardsThunk.get.pending, defaultPending);
    builder.addCase(dashboardsThunk.get.rejected, defaultRejected);
  },
});

export const dashboardReducer = dashboardSlice.reducer;
