import { FieldValues, ValidateResult } from 'react-hook-form';

export interface IFieldProps {
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
  onChange?: (value: string) => void;
  validate?: (value: unknown, fields: FieldValues) => ValidateResult | Promise<ValidateResult>;
}

export enum TextType {
  text = 'text',
  number = 'number',
  password = 'password',
  email = 'email',
}
