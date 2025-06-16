import { createAsyncThunk } from '@reduxjs/toolkit';

import { widgetsApi } from './api';
import { apiBaseQuery } from '@shared/api';
import { IWidgetData } from './types';

export const widgetsThunk = {
  select: createAsyncThunk('widgets/get', async (dashboard: string, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(widgetsApi.getWidgets(dashboard), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
  create: createAsyncThunk('widgets/post', async (data: IWidgetData, { rejectWithValue }) => {
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
  fetchWidgetData: createAsyncThunk('widget/fetchWidgetData', async (widget: string, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(widgetsApi.fetchWidgetData(widget), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
  fetchData: createAsyncThunk('widget/fetchData', async (watchers: string[], { rejectWithValue }) => {
    try {
      return await apiBaseQuery(widgetsApi.fetchData(watchers), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
};
