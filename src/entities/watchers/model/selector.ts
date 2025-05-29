import { createSelector } from '@reduxjs/toolkit';

export const getWatchersListState = (state: RootState) => state.watchersList;

export const selectWatchersStatus = createSelector(getWatchersListState, (state) => state.status);
export const selectWatchers = createSelector(getWatchersListState, (state) => state.data);

// Current watcher
export const getWatcherState = (state: RootState) => state.watcher;

export const selectWatcherStatus = createSelector(getWatcherState, (state) => state.status);
export const selectWatcher = createSelector(getWatcherState, (state) => state.data);

export const selectWatcherRecords = createSelector(getWatcherState, (state) => state.data?.records);

// Watcher Fields
export const getWatcherFeilds = (state: RootState) => state.fields;

export const selectWatcherParser = createSelector(getWatcherFeilds, (state) => state.data.parser);

// Field Handlers
export const selectWatcherHandlersPredicates = createSelector(
  getWatcherFeilds,
  (state) => state.data.handlers.predicates
);
export const selectWatcherHandlersActions = createSelector(getWatcherFeilds, (state) => state.data.handlers.actions);
