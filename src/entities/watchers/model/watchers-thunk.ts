import { createAsyncThunk } from '@reduxjs/toolkit';

import { watchersApi } from './watchers-api';
import { apiBaseQuery } from '@shared/api';

export const getWatchers = createAsyncThunk('watchers/get', async (_, { rejectWithValue }) => {
  try {
    return await apiBaseQuery(watchersApi.getWatchers(), rejectWithValue);
  } catch (error) {
    return error;
  }
});

export const getWatcher = createAsyncThunk('watcher/get', async (name: string, { rejectWithValue }) => {
  try {
    return await apiBaseQuery(watchersApi.getWatcher(name), rejectWithValue);
  } catch (error) {
    return error;
  }
});

export const getWatcherRecords = createAsyncThunk('watcherRecords/get', async (name: string, { rejectWithValue }) => {
  try {
    return apiBaseQuery(watchersApi.getRecords(name, 10), rejectWithValue);
  } catch (error) {
    return error;
  }
});
