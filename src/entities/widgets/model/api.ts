import { IWidgetData, TWidgetSize } from './types';

export const widgetsApi = {
  getWidgets: (dashboard: string) => ({ url: `/dashboards/${dashboard}/widgets` }),
  createWidget: (data: IWidgetData) => ({ url: '/widgets', method: 'post', data }),
  deleteWidget: (id: string) => ({ url: `/widgets/${id}`, method: 'delete' }),
  getWidget: (id: string) => ({ url: `/widgets/${id}` }),
  fetchWidgetData: (id: string) =>  ({ url: `/widgets/${id}/data` }),
  fetchData: (watchers: string[]) => ({ url: `/widgets/data`, method: 'post', data: { watchers } }),
  updateSize: (data: TWidgetSize) => ({ url: `/widgets/${data.widget}/size`, method: 'post', data: { ...data }})  
};
