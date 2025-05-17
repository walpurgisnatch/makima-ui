import { createAsyncThunk } from '@reduxjs/toolkit';

import { widgetsApi } from './api';
import { apiBaseQuery } from '@shared/api';
import { IWidget } from './types';

export const widgetsThunk = {
  select: createAsyncThunk('widgets/get', async (_, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(widgetsApi.getWidgets(), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
  create: createAsyncThunk('widgets/post', async (data: IWidget, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(widgetsApi.createWidget(data), rejectWithValue);
    } catch (error) {
      console.log(error);
      return error;
    }
  }),
  get: createAsyncThunk('widget/get', async (id: string, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(widgetsApi.getWidget(id), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
  delete: createAsyncThunk('widget/delete', async (id: string, { rejectWithValue }) => {
    try {
      await apiBaseQuery(widgetsApi.deleteWidget(id), rejectWithValue);
      return id;
    } catch (error) {
      return error;
    }
  }),
  fetchData: createAsyncThunk('widget/fetchData', async (widget: string, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(widgetsApi.fetchData(widget), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
};
