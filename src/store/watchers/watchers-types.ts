export interface IInitialState {
  isLoading: boolean;
  watchers: TWatcher[];
}

export type TWatcher = {
  name: string;
  value: string | number;
  records: number;
  parsed: string;
};
