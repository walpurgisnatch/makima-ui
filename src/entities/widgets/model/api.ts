import { IWidget } from './types';

export const widgetsApi = {
  getWidgets: () => ({ url: '/widgets' }),
  createWidget: (data: IWidget) => ({ url: '/widgets', method: 'post', data }),
  deleteWidget: (id: string) => ({ url: `/widgets/${id}`, method: 'delete' }),
  getWidget: (id: string) => ({ url: `/widgets/${id}` }),
  fetchData: (id: string) =>  ({ url: `/widgets/${id}/data` })
};
