import React from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import cn from 'classnames';

import { useAppDispatch, useLocale } from '@shared/hooks';
import { Panel, Field, TextType, HeaderActions } from '@shared/ui';
import { initialValues } from './constants';
import { SENTRY_TYPES, URLS } from '@shared/constants';
import { watchersThunk } from '@entities/watchers';
import { IWatcher } from '@entities/watchers/store';

import styles from './styles.module.scss';

export const CreateWatcher = () => {
  const { t } = useLocale();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formMethods = useForm<any>({
    mode: 'onChange',
    defaultValues: initialValues,
  });
  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid },
  } = formMethods;

  const type = watch('type');
  const submitDisabled = !isValid;

  const {
    fields: handlers,
    append: addHandler,
    remove: removeHandler,
  } = useFieldArray({
    control,
    name: 'handlers',
  });

  const submit = (data: IWatcher) => {
    const result = {
      ...data,
      // @ts-ignore
      handlers: data.handlers.map((handler) => handler.value),
    };
    dispatch(watchersThunk.create(result));
    navigate(`/${URLS.Watchers}/${data.name}`);
  };

  return (
    <>
      <Panel>
        <HeaderActions title={t('create_watcher.title')}>
          <Button type='primary' disabled={submitDisabled} onClick={handleSubmit(submit)}>
            {t('general.save')}
          </Button>
        </HeaderActions>
        {/* <h1>{t('create_watcher.title')}</h1> */}

        <FormProvider {...formMethods}>
          <div className='d-flex flex-row'>
            <div className='d-flex flex-column'>
              <Field
                name='name'
                label={t('create_watcher.fields.name')}
                type={TextType.text}
                className={cn(styles.field, 'd-flex flex-column mb-2')}
              />
              <Field
                name='type'
                label={t('create_watcher.fields.type')}
                type='select'
                options={SENTRY_TYPES.map((item) => ({ value: item.value, label: t(item.label) }))}
                className={cn(styles.field, 'd-flex flex-column mb-2')}
              />

              {type === 'html' && (
                <Field
                  name='page'
                  label={t('create_watcher.fields.page')}
                  type={TextType.text}
                  className={cn(styles.field, 'd-flex flex-column mb-2')}
                />
              )}
              {type === 'api' && (
                <Field
                  name='url'
                  label={t('create_watcher.fields.url')}
                  type={TextType.text}
                  className={cn(styles.field, 'd-flex flex-column mb-2')}
                />
              )}

              <Field
                name='target'
                label={t('create_watcher.fields.target')}
                type={TextType.text}
                className={cn(styles.field, 'd-flex flex-column mb-2')}
              />
            </div>

            <div className='d-flex flex-column mx-4'>
              <Field
                name='interval'
                label={t('create_watcher.fields.interval')}
                type={TextType.number}
                className={cn(styles.field, 'd-flex flex-column mb-2')}
              />
              <Field
                name='parser'
                label={t('create_watcher.fields.parser')}
                type={TextType.text}
                className={cn(styles.field, 'd-flex flex-column mb-2')}
              />

              <Space direction='vertical' style={{ width: '100%' }}>
                {handlers.map((_, index) => (
                  <Space key={index} style={{ display: 'flex', marginBottom: 8 }}>
                    <Field
                      name={`handlers.${index}.value`}
                      label={t('create_watcher.fields.handlers')}
                      type={TextType.text}
                      className={cn(styles.handlersField, 'd-flex flex-column mb-2')}
                    />
                    {handlers.length > 1 && (
                      <Button danger icon={<MinusOutlined />} onClick={() => removeHandler(index)} />
                    )}
                  </Space>
                ))}
              </Space>

              <Button type='dashed' onClick={addHandler} icon={<PlusOutlined />} style={{ marginTop: 8 }}>
                {t('general.add')}
              </Button>
            </div>
          </div>
        </FormProvider>
      </Panel>
    </>
  );
};
