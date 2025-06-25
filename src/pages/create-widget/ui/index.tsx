import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'antd';
import cn from 'classnames';

import { selectWatchers, TWatcher, watchersThunk } from '@entities/watchers';
import { Widget, WidgetTypes, durationOptions, selectWidget, useChartType, widgetsThunk } from '@entities/widgets';
import { useAppDispatch, useAppSelector, useLocale } from '@shared/hooks';
import { Panel, HeaderActions, Field } from '@shared/ui';
import { ISelect, TextType } from '@shared/types';
import { initialValues } from './constants';
import StandardOptions from './StandardOptions';
import StyleOptions from './StyleOptions';

import styles from './styles.module.scss';

export const CreateWidget = () => {
  const { t } = useLocale();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const widget = useAppSelector(selectWidget);
  const watchersList = useAppSelector(selectWatchers);
  const { dashboardName, widgetId } = useParams();
  const isCreate = !widgetId;

  const formMethods = useForm<any>({
    mode: 'onChange',
    defaultValues: initialValues,
  });
  const {
    handleSubmit,
    reset,
    watch,
    formState: { isValid },
  } = formMethods;

  const [watchers, chartType, widgetType, widgetStyles, duration, name, description] = watch([
    'watchers',
    'chartType',
    'widgetType',
    'styles',
    'duration',
    'name',
    'description',
  ]);
  const type = useChartType(widgetType, chartType);
  const submitDisabled = !isValid;

  useEffect(() => {
    dispatch(watchersThunk.select());
  }, [dispatch]);

  useEffect(() => {
    widgetId && dispatch(widgetsThunk.get(widgetId));
  }, [dispatch, widgetId]);

  useEffect(() => {
    if (!isCreate && widget) {
      reset(widget);
    }
  }, [reset, widgetId, isCreate]);

  const submit = (data: any) => {
    const result = {
      ...data,
      data: undefined,
      dashboard: dashboardName,
      styles: JSON.stringify(data.styles),
    };
    if (isCreate) {
      dispatch(widgetsThunk.create(result));
      navigate('./../../');
    } else {
      dispatch(widgetsThunk.update({ id: widgetId, data: result }));
      navigate('./../../../');
    }
  };

  const widgetTypeOptions: ISelect[] = Object.values(WidgetTypes).map((item) => ({
    label: `widgets.fields.widget_type.${item.toLowerCase()}`,
    value: item,
  }));

  return (
    <>
      <FormProvider {...formMethods}>
        <form>
          <HeaderActions title={isCreate ? t('widgets.create_widget_title') : t('widgets.edit_widget_title')}>
            <Button type='primary' disabled={submitDisabled} onClick={handleSubmit(submit)}>
              {t('general.save')}
            </Button>
          </HeaderActions>
          <div className={styles.wrapper}>
            <div className={styles.widgetZone}>
              <div className={styles.general}>
                <Panel>
                  <Field
                    name='name'
                    label='widgets.fields.name'
                    type={TextType.text}
                    className={cn(styles.field, 'd-flex flex-column mb-2')}
                  />
                  <Field
                    name='description'
                    label='widgets.fields.description'
                    type={TextType.text}
                    className={cn(styles.field, 'd-flex flex-column mb-2')}
                  />
                  <Field
                    name='watchers'
                    label='widgets.fields.watchers'
                    type='select'
                    props={{
                      options: watchersList.map((watcher: TWatcher) => ({ value: watcher.name, label: watcher.name })),
                      multiple: true,
                    }}
                    className={cn(styles.field, 'd-flex flex-column mb-2')}
                  />
                  <div className={styles.timeSection}>
                    <Field
                      name='duration'
                      label='widgets.fields.duration'
                      type='select'
                      props={{ options: durationOptions }}
                      className={cn(styles.timeField, 'd-flex flex-column mb-2')}
                    />
                    <Field
                      name='refresh'
                      label='widgets.fields.refresh'
                      type={TextType.text}
                      className={cn(styles.timeField, 'd-flex flex-column mb-2')}
                    />
                  </div>
                </Panel>
              </div>

              <Widget
                className={styles.widget}
                id={null!}
                chartId={null!}
                isEditing
                name={name}
                description={description}
                chartType={chartType}
                widgetType={widgetType}
                chartStyles={widgetStyles}
                watchers={watchers}
                duration={duration}
                refreshTime={widget?.refreshTime}
              />
            </div>

            <div className={styles.controllersZone}>
              <Panel className={styles.type}>
                <Field
                  name='widgetType'
                  label='widgets.fields.widget_type.name'
                  type='select'
                  value={widgetTypeOptions[0]?.value}
                  props={{ options: widgetTypeOptions }}
                  className={cn(styles.field, 'd-flex flex-column mb-2')}
                />
              </Panel>
              <Panel className={styles.blocks}>
                <div className={styles.scrollable}>
                  <StandardOptions widgetType={type} />
                  <StyleOptions widgetType={type} />
                </div>
              </Panel>
            </div>
          </div>
        </form>
      </FormProvider>
    </>
  );
};
