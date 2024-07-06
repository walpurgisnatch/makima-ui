import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store/store';

export const getWatchersState = (state: RootState) => state.watchers;

export const getWatchersSelector = createSelector(getWatchersState, (state) => state.watchers);

export const getWatchersLoadingSelector = createSelector(getWatchersState, (state) => state.isLoading);
