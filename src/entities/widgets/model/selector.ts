import { createSelector } from '@reduxjs/toolkit';

export const getWidgetsListState = (state: RootState) => state.widgetsList;

export const selectWidgetsStatus = createSelector(getWidgetsListState, (state) => state.status);
export const selectWidgets = createSelector(getWidgetsListState, (state) => state.data);

// Current widget
export const getWidgetState = (state: RootState) => state.widget;

export const selectWidgetStatus = createSelector(getWidgetState, (state) => state.status);
export const selectWidget = createSelector(getWidgetState, (state) => state.data);
export const selectCurrentChartData = createSelector(selectWidget, (widget) => widget.data);

export const selectChartData = (state: RootState, id?: string) => id && state.widgetData.data?.[id];
