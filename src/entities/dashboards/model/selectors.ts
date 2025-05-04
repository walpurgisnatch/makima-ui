import { createSelector } from '@reduxjs/toolkit';

export const getDashboardsListState = (state: RootState) => state.dashboardsList;

export const selectDashboardsStatus = createSelector(getDashboardsListState, (state) => state.status);
export const selectDashboards = createSelector(getDashboardsListState, (state) => state.data);

// Current dashboard
export const getDashboardState = (state: RootState) => state.dashboard;

export const selectDashboardStatus = createSelector(getDashboardState, (state) => state.status);
export const selectDashboard = createSelector(getDashboardState, (state) => state.data);
