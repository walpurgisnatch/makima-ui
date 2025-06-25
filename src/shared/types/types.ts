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

export interface IFieldProps {
  min?: number;
  max?: number;
  step?: number;
  minLength?: number;
  multiple?: boolean;
  pattern?: RegExp | string;
  options?: any[];
  placeholder?: string;
}

export interface IField {
  className?: string;
  defaultValue?: string | number | boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
  prefix?: string;
  required?: boolean;
  type?: string;
  value?: string | boolean;
  description?: string;
  rules?: any;
  icon?: ReactElement;
  props?: IFieldProps;
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
