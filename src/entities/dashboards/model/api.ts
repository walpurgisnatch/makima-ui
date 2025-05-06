import { TDashboard } from './types';

export const dashboardsApi = {
  getDashboards: () => ({ url: '/dashboards' }),
  createDashboard: (data: TDashboard) => ({ url: '/dashboards', method: 'post', data }),
  updateDashboard: (name: string, data: TDashboard) => ({ url: `/dashboards/${name}`, method: 'put', data }),
  deleteDashboard: (name: string) => ({ url: `/dashboards/${name}`, method: 'delete' }),
  getDashboard: (name?: string) => ({ url: `/dashboards/${name}` }),
};
