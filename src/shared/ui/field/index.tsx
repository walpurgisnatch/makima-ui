import React, { forwardRef, useMemo } from 'react';
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form';
import { Checkbox, DatePicker, Select, Input, Tooltip, TreeSelect, ConfigProvider } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import cn from 'classnames';

import { IFieldProps, TextType } from './types';

import styles from './styles.module.scss';

export const Field = forwardRef<HTMLInputElement, IFieldProps>(
  (
    {
      name,
      prefix,
      className,
      defaultValue,
      disabled,
      label,
      min,
      minLength,
      options,
      pattern,
      placeholder,
      required = false,
      step,
      type = TextType.text,
      value,
      description,
      multiple,
      onChange,
      validate,
      ...props
    },
    ref
  ) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    const nameField = useMemo(() => {
      const g = name || window.btoa(new Date().toISOString());
      const gg = prefix ? `${prefix}_${g}` : g;
      return gg;
    }, [name, prefix]);

    const renderFieldByType = (field: ControllerRenderProps<FieldValues, string>) => {
      const generalProps = {
        ...field,
        ...props,
        disabled,
        defaultValue,
        min,
        placeholder,
        step,
        type,
        multiple,
        // @ts-ignore
        onChange: (event) => {
          field.onChange(event);
          onChange && onChange(event);
        },
      };

      if (Object.keys(TextType).includes(type)) {
        return (
          <div className={styles.field}>
            {/* @ts-ignore */}
            <Input {...generalProps} className={styles.input} ref={ref} />
          </div>
        );
      }

      switch (type) {
        case 'select':
          if (options) {
            return <Select {...generalProps} options={options} />;
          } else {
            return <></>;
          }

        case 'checkbox':
          return <Checkbox {...generalProps} checked={generalProps.value} />;

        case 'date': {
          return <DatePicker {...generalProps} />;
        }

        case 'treeSelect':
          return (
            <ConfigProvider
              theme={{
                components: {
                  TreeSelect: {
                    indentSize: 0,
                    titleHeight: 22,
                  },
                },
              }}
            >
              <TreeSelect {...generalProps} treeData={options} virtual={false} />
            </ConfigProvider>
          );

        default:
          return <></>;
      }

      return <></>;
    };

    return (
      <Controller
        control={control}
        name={nameField}
        rules={{
          minLength: minLength && {
            value: minLength,
            message: `Значение должно быть не короче ${minLength} символов`,
          },
          pattern: pattern && {
            value: pattern,
            message: 'Неправильный формат',
          },
          required: {
            value: required,
            message: 'Поле не может быть пустым',
          },
          validate,
        }}
        render={({ field }) => {
          const currentValue = value || field.value;
          const isCurrentValueBoolean = typeof currentValue === 'boolean';

          const updatedField = {
            ...field,
            value: currentValue || (isCurrentValueBoolean ? currentValue : defaultValue),
          };

          return (
            <label className={cn(className, styles.label, { [styles.empty]: !label })}>
              <span className={cn(styles.text, 'd-flex', { ['mb-2']: type !== 'checkbox' })}>
                {label}{' '}
                {required && (
                  <span className={styles.error}>
                    <Tooltip title='Поле обязательно для заполнения'>*</Tooltip>
                  </span>
                )}
                {description && (
                  <Tooltip className={cn(styles.description, 'ml-1')} title={description}>
                    <InfoCircleOutlined />
                  </Tooltip>
                )}
              </span>
              {renderFieldByType(updatedField)}

              {/* @ts-ignore */}
              <div className={cn(styles.error, 'mt-1')}>{errors[nameField]?.message}</div>
            </label>
          );
        }}
      />
    );
  }
);

export * from './types';
