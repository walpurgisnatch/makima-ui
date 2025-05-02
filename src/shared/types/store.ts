export interface IError {
  status: number | undefined;
  data: string | null | unknown;
  error: { message: string } | null;
  isLogoutNeeded: boolean;
}

export type LoadingStatuses = 'Idle' | 'Pending' | 'Loading' | 'Succeeded' | 'Failed';

export type State<T> = {
  value: T;
  status: LoadingStatuses;
  error: IError | null;
};
