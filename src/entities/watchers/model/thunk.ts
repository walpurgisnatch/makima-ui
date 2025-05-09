import { createAsyncThunk } from '@reduxjs/toolkit';

import { watchersApi } from './api';
import { apiBaseQuery } from '@shared/api';
import { IWatcher } from './types';

export const watchersThunk = {
  select: createAsyncThunk('watchers/get', async (_, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(watchersApi.getWatchers(), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
  create: createAsyncThunk('watchers/post', async (data: IWatcher, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(watchersApi.createWatcher(data), rejectWithValue);
    } catch (error) {
      console.log(error);
      return error;
    }
  }),
  get: createAsyncThunk('watcher/get', async (name: string, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(watchersApi.getWatcher(name), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
  delete: createAsyncThunk('watcher/delete', async (name: string, { rejectWithValue }) => {
    try {
      await apiBaseQuery(watchersApi.deleteWatcher(name), rejectWithValue);
      return name;
    } catch (error) {
      return error;
    }
  }),
  selectRecords: createAsyncThunk('watcherRecords/get', async (name: string, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(watchersApi.getRecords(name, 10), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
  getParsers: createAsyncThunk('watcher-parsers/get', async (type: string, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(watchersApi.getParsers(type), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
};
