import { TDashboard } from '@store/dashboards';

export const dashboardsApi = {
  getDashboards: () => ({ url: '/dashboards' }),
  createDashboard: (data: TDashboard) => ({ url: '/dashboards', method: 'post', data }),
  updateDashboard: (data: TDashboard) => ({ url: `/dashboard/${data.name}`, method: 'put', data }),
  deleteDashboard: (name: string) => ({ url: `/dashboards/${name}`, method: 'delete' }),
  getDashboard: (name?: string) => ({ url: `/dashboards/${name}` }),
};
