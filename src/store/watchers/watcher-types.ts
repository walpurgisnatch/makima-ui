export interface IInitialState {
  isLoading: boolean;
  watchers: TWatcher[];
  currentLoading: boolean;
  currentWatcher: TWatcher;
}

export type TWatcher = {
  name: string;
  value: string | number;
  parsed: string;
  recordsCount: number;
  records: TRecord[];
};

export interface IWatcher {
  id?: number;
  name: string;
  type: string;
  target: string;
  parser: string;
  interval: number | string;
  handlers: string[];
  page: string;
  url: string;
}

export type TRecord = {
  id: number;
  watcher: string;
  value: string | number;
  timestamp: string;
};
