export interface ISelect<T = string | boolean> {
  value: T;
  label: string;
  isDisabled?: boolean;
}