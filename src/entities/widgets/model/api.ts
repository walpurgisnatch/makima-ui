import { IWidget, TWidgetSize } from './types';

export const widgetsApi = {
  getWidgets: (dashboard: string) => ({ url: `/dashboards/${dashboard}/widgets` }),
  createWidget: (data: IWidget) => ({ url: '/widgets', method: 'post', data }),
  updateWidget: (id: string, data: IWidget) => ({ url: `/widgets/${id}`, method: 'put', data }),
  deleteWidget: (id: string) => ({ url: `/widgets/${id}`, method: 'delete' }),
  getWidget: (id: string) => ({ url: `/widgets/${id}` }),
  fetchChartData: (id: string) => ({ url: `/charts/${id}/data` }),
  fetchData: (watchers: string[], duration: number) => ({
    url: `/widgets/data`,
    method: 'post',
    data: { watchers, duration },
  }),
  updateSize: (data: TWidgetSize) => ({ url: `/widgets/${data.widget}/size`, method: 'post', data: { ...data } }),
  updateWidgetsOrder: (widgets: any) => ({ url: `/widgets/order`, method: 'post', data: { widgets } }),
};
