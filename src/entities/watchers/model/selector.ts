import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store/store';

export const getWatchersListState = (state: RootState) => state.watchersList;

export const selectWatchersStatus = createSelector(getWatchersListState, (state) => state.status);
export const selectWatchers = createSelector(getWatchersListState, (state) => state.value);

// Current watcher
export const getWatcherState = (state: RootState) => state.watcher;

export const selectWatcherStatus = createSelector(getWatcherState, (state) => state.status);
export const selectWatcher = createSelector(getWatcherState, (state) => state.value);

export const selectWatcherRecords = createSelector(getWatcherState, (state) => state.value?.records);
