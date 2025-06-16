import { ReactElement } from 'react';
import { FieldValues, ValidateResult } from 'react-hook-form';

export interface ISelect<T = string | boolean> {
  value: T;
  label: string;
  isDisabled?: boolean;
}

export type RadioItem<T = any> = {
  name: string;
  label: string;
  value: T;
  disabled?: boolean;
};

export interface IField {
  className?: string;
  defaultValue?: string | boolean;
  disabled?: boolean;
  label?: string;
  min?: number;
  minLength?: number;
  name?: string;
  options?: any[];
  pattern?: RegExp;
  placeholder?: string;
  prefix?: string;
  required?: boolean;
  step?: number;
  type?: string;
  value?: string | boolean;
  description?: string;
  multiple?: boolean;
  rules?: object[] | object;
  Icon?: ReactElement;
  requiredMark?: boolean;
  helpText?: string;
  onChange?: (value: string | string[]) => void;
  validate?: (value: unknown, fields: FieldValues) => ValidateResult | Promise<ValidateResult>;
}

export interface Fields {
  [key: string]: IField;
}

export enum TextType {
  text = 'text',
  number = 'number',
  password = 'password',
  email = 'email',
}
