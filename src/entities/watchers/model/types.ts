export type TWatcher = {
  name: string;
  value: string | number;
  parsed: string;
  recordsCount: number;
  records: TRecord[];
};

export type THandler = {
  recordp: boolean;
  once: boolean;
  predicate: {
    name: string;
    args: string[];
  };
  actions: { name: string; args: string[] }[];
};

export interface IWatcher {
  id?: number;
  name: string;
  type: string;
  target: string;
  parser: string;
  interval: number | string;
  handlers: { recordp: boolean; once: boolean; predicate: string | null; actions: string[] | null }[];
  page: string;
  url: string;
}

export type TWatcherFormData = Omit<IWatcher, 'handlers'> & { handlers: THandler[] };

export type TRecord = {
  id: number;
  watcher: string;
  value: string | number;
  timestamp: string;
};

export type TFieldData = {
  args: string[];
  doc: string;
  name: string;
  type: string;
};

export type TParser = TFieldData[];

export type THandlers = {
  actions: TFieldData[];
  predicates: TFieldData[];
};

export type TWatcherFields = {
  parser: TParser;
  handlers: THandlers;
};
