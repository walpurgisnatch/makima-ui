import { AppThunk } from '@store/store';
import { watchersApi } from './watchers-api';
import { setWatchersLoading, setWatchers, setCurrentLoading, setCurrentWatcher, setCurrentWatcherRecords } from '@store/watchers';

export const getWatchers = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setWatchersLoading(true));
    const response = await watchersApi.getWatchers();
    if (response.status === 200) {
      dispatch(setWatchers(response.data));
    }
  } catch (error) {
    console.error('error', error);
  } finally {
    dispatch(setWatchersLoading(false));
  }
};

export const getWatcher = (name?: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setCurrentLoading(true));
    const response = await watchersApi.getWatcher(name);
    if (response.status === 200) {
      dispatch(setCurrentWatcher(response.data));
    }
  } catch (error) {
    console.error('error', error);
  } finally {
    dispatch(setWatchersLoading(false));
  }
};

export const getWatcherRecords = (watcher?: string): AppThunk => async (dispatch) => {
  try {
    dispatch(setCurrentLoading(true));
    const response = await watchersApi.getRecords(watcher, 10);
    if (response.status === 200) {
      dispatch(setCurrentWatcherRecords(response.data));
    }
  } catch (error) {
    console.error('error', error);
  } finally {
    dispatch(setWatchersLoading(false));
  }
};