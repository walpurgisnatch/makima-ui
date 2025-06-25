import React, { forwardRef, useMemo } from 'react';
import { Controller, ControllerRenderProps, FieldValues, useFormContext } from 'react-hook-form';
import { Checkbox, DatePicker, Select, Input, Tooltip, TreeSelect, ConfigProvider, Slider } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import cn from 'classnames';

import { useLocale } from '@shared/hooks';
import { IField, TextType } from '@shared/types';

import styles from './styles.module.scss';

export const Field = forwardRef<HTMLInputElement, IField>(
  (
    {
      name,
      prefix,
      className,
      defaultValue,
      disabled,
      label,
      required = false,
      type = TextType.text,
      value,
      description,
      rules,
      icon,
      onChange,
      validate,
      ...props
    },
    ref
  ) => {
    const { t } = useLocale();
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
        ...props.props,
        disabled,
        defaultValue,
        type,

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
          if (generalProps.options) {
            const _options = generalProps.options.map((option) => ({ ...option, label: t(option.label) }));
            return (
              <Select
                {...generalProps}
                options={_options}
                mode={generalProps.multiple ? 'multiple' : undefined}
                className={className}
              />
            );
          } else {
            return <></>;
          }

        case 'checkbox':
          return <Checkbox {...generalProps} checked={!!value} />;

        case 'date': {
          return (
            <DatePicker
              {...generalProps}
              pattern={typeof generalProps.pattern === 'string' ? generalProps.pattern : undefined}
            />
          );
        }

        case 'slider': {
          return (
            <Slider
              {...generalProps}
              range={false}
              defaultValue={typeof defaultValue === 'number' ? defaultValue : 0}
            />
          );
        }

        case 'treeSelect':
          return (
            <ConfigProvider
              theme={{
                components: {
                  TreeSelect: {
                    // @ts-ignore
                    indentSize: 0,
                    titleHeight: 22,
                  },
                },
              }}
            >
              <TreeSelect {...generalProps} treeData={generalProps.options} virtual={false} />
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
          pattern: rules?.pattern && {
            value: rules?.pattern,
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
                <span>{icon}</span> {t(label)}{' '}
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
