import { createAsyncThunk } from '@reduxjs/toolkit';

import { dashboardsApi } from './api';
import { apiBaseQuery } from '@shared/api';
import { IDashboard, TDashboard } from '@store/dashboards';

export const dashboardsThunk = {
  getAll: createAsyncThunk('dashboards/get', async (_, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(dashboardsApi.getDashboards(), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
  create: createAsyncThunk('dashboards/post', async (data: IDashboard, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(dashboardsApi.createDashboard(data), rejectWithValue);
    } catch (error) {
      console.log(error);
      return error;
    }
  }),
  get: createAsyncThunk('dashboard/get', async (name: string, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(dashboardsApi.getDashboard(name), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
  update: createAsyncThunk('dashboard/put', async (data: TDashboard, { rejectWithValue }) => {
    try {
      return await apiBaseQuery(dashboardsApi.updateDashboard(data), rejectWithValue);
    } catch (error) {
      return error;
    }
  }),
  delete: createAsyncThunk('dashboard/delete', async (name: string, { rejectWithValue }) => {
    try {
      await apiBaseQuery(dashboardsApi.deleteDashboard(name), rejectWithValue);
      return name;
    } catch (error) {
      return error;
    }
  }),
};

// export const getDashboards = createAsyncThunk('dashboards/get', async (_, { rejectWithValue }) => {
//   try {
//     return await apiBaseQuery(dashboardsApi.getDashboards(), rejectWithValue);
//   } catch (error) {
//     return error;
//   }
// });

// export const getDashboard = createAsyncThunk('dashboard/get', async (name: string, { rejectWithValue }) => {
//   try {
//     return await apiBaseQuery(dashboardsApi.getDashboard(name), rejectWithValue);
//   } catch (error) {
//     return error;
//   }
// });

// export const createDashboard = createAsyncThunk('dashboards/post', async (data: IDashboard, { rejectWithValue }) => {
//   try {
//     return await apiBaseQuery(dashboardsApi.createDashboard(data), rejectWithValue);
//   } catch (error) {
//     console.log(error);
//     return error;
//   }
// });

// export const deleteDashboard = createAsyncThunk('dashboard/delete', async (name: string, { rejectWithValue }) => {
//   try {
//     await apiBaseQuery(dashboardsApi.deleteDashboard(name), rejectWithValue);
//     return name;
//   } catch (error) {
//     return error;
//   }
// });
