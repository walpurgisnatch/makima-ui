import React, { useEffect } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Space } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import cn from 'classnames';

import { useAppDispatch, useAppSelector, useLocale } from '@shared/hooks';
import { Panel, Field, HeaderActions } from '@shared/ui';
import { initialValues } from './constants';
import { SENTRY_TYPES, URLS } from '@shared/constants';
import {
  selectWatcherHandlersActions,
  selectWatcherHandlersPredicates,
  selectWatcherParser,
  watchersThunk,
} from '@entities/watchers';
import { TWatcherFormData, TFieldData } from '@entities/watchers/store';
import { useBuildTreeData } from '@entities/watchers';
import { GenerateFields } from './GenerateFields';
import { TextType } from '@shared/types';

import styles from './styles.module.scss';

export const CreateWatcher = () => {
  const { t } = useLocale();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const parserValues = useAppSelector(selectWatcherParser);

  const handlersActions = useAppSelector(selectWatcherHandlersActions);
  const handlerPredicates = useAppSelector(selectWatcherHandlersPredicates);

  const treeDataOfHandlerPredicates = useBuildTreeData(handlerPredicates);
  const treeDataOfHandlerActions = useBuildTreeData(handlersActions);

  const formMethods = useForm<TWatcherFormData>({
    mode: 'onChange',
    defaultValues: initialValues,
  });
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isValid },
  } = formMethods;

  const type = watch('type');
  const handlersWatch = watch('handlers');
  const submitDisabled = !isValid;

  useEffect(() => {
    dispatch(watchersThunk.getParsers(type));
    dispatch(watchersThunk.getHandlersData());
  }, [type, dispatch]);

  const {
    fields: handlers,
    append: addHandler,
    remove: removeHandler,
  } = useFieldArray({
    control,
    name: 'handlers',
  });

  const submit = (data: TWatcherFormData) => {
    console.log(data);
    const result = {
      ...data,
      handlers: data.handlers.map((handler) => {
        const predicate = `${handler.predicate.name} ${handler.predicate.args.join(' ')}`.trim() || null;
        const actions: string[] = [];
        handler.actions.forEach(
          (action) => action.name && actions.push(`${action.name} ${action.args.join(' ')}`.trim())
        );
        return { ...handler, predicate, actions: actions.length ? actions : null };
      }),
    };

    dispatch(watchersThunk.create(result));
    navigate(`/${URLS.Watchers}/${data.name}`);
    reset();
  };

  return (
    <>
      <Panel>
        <HeaderActions title={t('create_watcher.title')}>
          <Button type='primary' disabled={submitDisabled} onClick={handleSubmit(submit)}>
            {t('general.save')}
          </Button>
        </HeaderActions>

        <FormProvider {...formMethods}>
          <div className='d-flex flex-row'>
            <div className='d-flex flex-column'>
              <Field
                name='name'
                label='create_watcher.fields.name'
                type={TextType.text}
                className={cn(styles.field, 'd-flex flex-column mb-2')}
              />
              <Field
                name='type'
                label='create_watcher.fields.type'
                type='select'
                props={{ options: SENTRY_TYPES }}
                className={cn(styles.field, 'd-flex flex-column mb-2')}
              />

              {type === 'html' && (
                <Field
                  name='page'
                  label='create_watcher.fields.page'
                  type={TextType.text}
                  className={cn(styles.field, 'd-flex flex-column mb-2')}
                />
              )}
              {type === 'api' && (
                <Field
                  name='url'
                  label='create_watcher.fields.url'
                  type={TextType.text}
                  className={cn(styles.field, 'd-flex flex-column mb-2')}
                />
              )}

              <Field
                name='target'
                label='create_watcher.fields.target'
                type={TextType.text}
                className={cn(styles.field, 'd-flex flex-column mb-2')}
              />
            </div>

            <div className='d-flex flex-column mx-4'>
              <Field
                name='interval'
                label='create_watcher.fields.interval'
                type={TextType.number}
                className={cn(styles.field, 'd-flex flex-column mb-2')}
              />
              <Field
                name='parser'
                label='create_watcher.fields.parser'
                type='select'
                props={{
                  options: parserValues.map((parserValue: TFieldData) => ({
                    value: parserValue.name,
                    label: parserValue.name,
                  })),
                }}
                className={cn(styles.field, 'd-flex flex-column mb-2')}
              />

              <Space direction='vertical' style={{ width: '100%' }}>
                <div>{t('create_watcher.fields.handlers.name')}</div>
                <div className={cn(styles.handlersWrapper, 'overflow-y-auto')}>
                  {handlers.map((_, index) => (
                    <div key={_.id}>
                      <Space size={30}>
                        <Field
                          type='checkbox'
                          name={`handlers.${index}.recordp`}
                          label='create_watcher.fields.handlers.recordp'
                        />
                        <Field
                          type='checkbox'
                          name={`handlers.${index}.once`}
                          label='create_watcher.fields.handlers.once'
                        />

                        {handlers.length > 1 && (
                          <Button danger icon={<MinusOutlined />} onClick={() => removeHandler(index)} />
                        )}
                      </Space>

                      <Space.Compact direction='vertical' block>
                        <Field
                          type='treeSelect'
                          name={`handlers.${index}.predicate.name`}
                          props={{ options: treeDataOfHandlerPredicates, placeholder: 'Choose predicate' }}
                          className={cn(styles.field, 'd-flex flex-column mb-2')}
                          label='create_watcher.fields.handlers.predicate'
                        />
                        <Space.Compact>
                          <GenerateFields
                            data={handlerPredicates}
                            handlerItem={handlersWatch[index]}
                            watchField='predicate'
                            handlerIndex={index}
                          />
                        </Space.Compact>
                      </Space.Compact>

                      <Space.Compact direction='vertical'>
                        <Field
                          type='treeSelect'
                          props={{ options: treeDataOfHandlerActions, multiple: true, placeholder: 'Choose actions' }}
                          label='create_watcher.fields.handlers.actions'
                          className={cn(styles.field, 'd-flex flex-column mb-2')}
                          name={`handlers.${index}.actions._`}
                          onChange={(selectedActions) => {
                            if (Array.isArray(selectedActions)) {
                              const newActions = selectedActions.map((name) => ({ name, args: [] }));
                              setValue(`handlers.${index}.actions`, newActions);
                            }
                          }}
                        />

                        <Space.Compact direction='vertical'>
                          <GenerateFields
                            data={handlersActions}
                            handlerItem={handlersWatch[index]}
                            watchField='actions'
                            handlerIndex={index}
                          />
                        </Space.Compact>
                      </Space.Compact>
                      {index !== handlers.length - 1 && <hr className={styles.line} />}
                    </div>
                  ))}
                </div>
              </Space>

              <Button
                type='dashed'
                onClick={() => {
                  addHandler(initialValues.handlers);
                }}
                icon={<PlusOutlined />}
                style={{ marginTop: 8, width: 200 }}
              >
                {t('general.add')}
              </Button>
            </div>
          </div>
        </FormProvider>
      </Panel>
    </>
  );
};
