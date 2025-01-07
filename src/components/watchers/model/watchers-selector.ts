import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store/store';

export const getWatchersState = (state: RootState) => state.watchers;

export const getWatchersLoadingSelector = createSelector(getWatchersState, (state) => state.isLoading);

export const getWatchersSelector = createSelector(getWatchersState, (state) => state.watchers);

// Current watcher
export const getCurrentLoadingSelector = createSelector(getWatchersState, (state) => state.currentLoading);

export const getCurrentWatcherSelector = createSelector(getWatchersState, (state) => state.currentWatcher);

export const getCurrentWatcherRecordsSelector = createSelector(getWatchersState, (state) => state.currentWatcher.records)
