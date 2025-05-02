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

export type TRecord = {
  id: number;
  watcher: string;
  value: string | number;
  timestamp: string;
};
