import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IInitialState, TWatcher } from './watchers-types';

const initialState: IInitialState = {
  isLoading: false,
  watchers: [],
};

const watchersSlice = createSlice({
  name: 'watchers',
  initialState,
  reducers: {
    setWatchersLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setWatchers: (state, action: PayloadAction<TWatcher[]>) => {
      state.watchers = action.payload;
    },
    resetWatchers: (state) => {
      state.watchers = initialState.watchers;
    },
  },
});

export const { setWatchers, setWatchersLoading, resetWatchers } = watchersSlice.actions;

export const watchersReducer = watchersSlice.reducer;
