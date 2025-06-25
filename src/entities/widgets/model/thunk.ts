import { createAsyncThunk } from '@reduxjs/toolkit';

import { widgetsApi } from './api';
import { apiBaseQuery } from '@shared/api';
import { IWidget, TWidgetSize } from './types';

export const widgetsThunk = {
  select: createAsyncThunk('widgets/get', async (dashboard: string, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(widgetsApi.getWidgets(dashboard), rejectWithValue);
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
  update: createAsyncThunk('widgets/put', async ({ id, data }: { id: string; data: IWidget }, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(widgetsApi.updateWidget(id, data), rejectWithValue);
    } catch (error) {
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
  fetchChartData: createAsyncThunk('widget/fetchChartData', async (chart: string, { rejectWithValue }) => {
    try {
      const result = await apiBaseQuery(widgetsApi.fetchChartData(chart), rejectWithValue);
      return {
        widget: chart,
        data: result,
      };
    } catch (error) {
      return error;
    }
  }),
  fetchData: createAsyncThunk(
    'widget/fetchData',
    async ({ watchers, duration }: { watchers: string[]; duration: number }, { rejectWithValue }) => {
      try {
        return await apiBaseQuery(widgetsApi.fetchData(watchers, duration), rejectWithValue);
      } catch (error) {
        return error;
      }
    }
  ),
  updateSize: createAsyncThunk('widget/updateData', async (data: TWidgetSize, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(widgetsApi.updateSize(data), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
  updateOrder: createAsyncThunk(
    'widget/updateOrder',
    async (widgets: { id: string; order: number }[], { rejectWithValue }) => {
      try {
        await apiBaseQuery(widgetsApi.updateWidgetsOrder(widgets), rejectWithValue);
        return widgets;
      } catch (error) {
        return error;
      }
    }
  ),
};
