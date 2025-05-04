import { axiosInstance, IAxiosRequest } from './axios';
import type { AxiosError } from 'axios';

import { i18next } from '../locale';
import type { IError } from '@shared/types';

export enum LoadingStatuses {
  Idle = 'Idle',
  Pending = 'Pending',
  Loading = 'Loading',
  Succeeded = 'Succeeded',
  Failed = 'Failed',
}

export const apiBaseQuery = async (
  { url, method = 'get', data = null, params = null, responseType }: IAxiosRequest,
  rejectWrapper?: any
) => {
  try {
    const result = await axiosInstance({ url, method, data, params, responseType });
    return Promise.resolve(result.data);
  } catch (axiosError) {
    const { response, message } = axiosError as AxiosError;

    const status = response?.status;
    const error: IError = {
      status,
      data: null,
      // @ts-ignore
      error: response?.data?.message || message || i18next.t('general.smth_wrong'),
      isLogoutNeeded: false,
    };

    error.data = response?.data || error.error;
    return Promise.reject(rejectWrapper ? rejectWrapper(error) : error);
  }
};

export const provideError = (
  state: any,
  payload: any,
  statusFieldName = 'status',
  isInitial = false,
  provideErrorField = true,
  isShowNotification = true
) => {
  if (statusFieldName) {
    state[statusFieldName] = isInitial ? LoadingStatuses.Failed : LoadingStatuses.Succeeded;
  }
  if (provideErrorField) {
    state.error = payload;
  }
  if (isShowNotification) {
    // TODO
  }
};

// @ts-ignore
export const defaultFulfilled = (state, { payload }) => {
  state.status = LoadingStatuses.Succeeded;
  state.data = payload;
};

// @ts-ignore
export const defaultPending = (state) => {
  state.status = LoadingStatuses.Loading;
  state.error = null;
};

export const defaultRejected = (
  state: any,
  { payload }: any,
  isInitial = false,
  provideErrorField = true,
  isShowNotification = true
) => {
  provideError(state, payload, 'status', isInitial, provideErrorField, isShowNotification);
};

export * from './axios';
