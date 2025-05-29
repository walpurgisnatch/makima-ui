import { TWatcherFormData } from '@entities/watchers';

export const initialValues: TWatcherFormData = {
  type: 'general',
  name: '',
  target: '',
  parser: '',
  interval: '',
  handlers: [{ recordp: false, once: false, predicate: { name: '', args: [] }, actions: [{ name: '', args: [] }] }],
  page: '',
  url: '',
};
