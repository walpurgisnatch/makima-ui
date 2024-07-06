import { AppThunk } from '@store/store';
import { watchersApi } from './watchers-api';
import { setWatchersLoading, setWatchers } from '@store/watchers';

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
