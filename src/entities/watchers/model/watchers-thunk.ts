import { createAsyncThunk } from '@reduxjs/toolkit';

import { watchersApi } from './watchers-api';
import { apiBaseQuery } from '@shared/api';
import { IWatcher } from '@store/watchers';

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
    return await apiBaseQuery(watchersApi.getRecords(name, 10), rejectWithValue);
  } catch (error) {
    return error;
  }
});

export const createWatcher = createAsyncThunk('watchers/post', async (data: IWatcher, { rejectWithValue }) => {
  try {
    return await apiBaseQuery(watchersApi.createWatcher(data), rejectWithValue);
  } catch (error) {
    console.log(error);
    return error;
  }
});

export const deleteWatcher = createAsyncThunk('watcher/delete', async (name: string, { rejectWithValue }) => {
  try {
    await apiBaseQuery(watchersApi.deleteWatcher(name), rejectWithValue);
    return name;
  } catch (error) {
    return error;
  }
});
