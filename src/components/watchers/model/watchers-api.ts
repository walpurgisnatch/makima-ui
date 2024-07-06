import { axiosInstance } from '@shared/api';
import { TWatcher } from '@store/watchers';

export const watchersApi = {
  getWatchers: () => axiosInstance.get<TWatcher[]>('/watchers'),
};
