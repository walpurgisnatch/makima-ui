import { createSelector } from '@reduxjs/toolkit';

export const getWatchersListState = (state: RootState) => state.watchersList;

export const selectWatchersStatus = createSelector(getWatchersListState, (state) => state.status);
export const selectWatchers = createSelector(getWatchersListState, (state) => state.data);

// Current watcher
export const getWatcherState = (state: RootState) => state.watcher;

export const selectWatcherStatus = createSelector(getWatcherState, (state) => state.status);
export const selectWatcher = createSelector(getWatcherState, (state) => state.data);

export const selectWatcherRecords = createSelector(getWatcherState, (state) => state.data?.records);

// Field Parsers
export const getWatcherParser = (state: RootState) => state.parser;

export const selectWatcherParser = createSelector(getWatcherParser, (state) => state.data);
