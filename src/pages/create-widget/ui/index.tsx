import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'antd';
import cn from 'classnames';

import { useLocale } from '@shared/hooks';
import { Panel, HeaderActions, Field, TextType } from '@shared/ui';
import { initialValues } from './constants';

import styles from './styles.module.scss';
import { Widget } from '@entities/widgets';
import { useSelector } from 'react-redux';
import { WidgetTypes, selectWidget } from '@entities/widgets/model';
import { ISelect } from '@shared/types';

export const CreateWidget = () => {
  const { t } = useLocale();
  const isCreate = true;
  const widget = useSelector(selectWidget);

  const formMethods = useForm<any>({
    mode: 'onChange',
    defaultValues: initialValues,
  });
  const {
    handleSubmit,
    formState: { isValid },
  } = formMethods;

  const submitDisabled = !isValid;

  const submit = (data: any) => {
    console.log(data);
  };

  const widgetTypeOptions: ISelect[] = Object.values(WidgetTypes).map((item) => ({
    label: `pages.widget.widgetType.${item.toLowerCase()}`,
    value: item,
  }));

  return (
    <>
      <FormProvider {...formMethods}>
        <HeaderActions title={t('create-widget.title')}>
          <Button type='primary' disabled={submitDisabled} onClick={handleSubmit(submit)}>
            {t('general.save')}
          </Button>
        </HeaderActions>
        <div className={cn(styles.wrapper, 'd-flex')}>
          <div className={styles.widgetZone}>
            <div className={styles.general}>
              <Panel>
                <Field
                  name='name'
                  label={t('create_widget.fields.name')}
                  type={TextType.text}
                  className={cn(styles.field, 'd-flex flex-column mb-2')}
                />
                <Field
                  name='description'
                  label={t('create_widget.fields.description')}
                  type={TextType.text}
                  className={cn(styles.field, 'd-flex flex-column mb-2')}
                />
                <Field
                  name='watchers'
                  label={t('create_widget.fields.watchers')}
                  type={TextType.text}
                  className={cn(styles.field, 'd-flex flex-column mb-2')}
                />
                <Field
                  name='duration'
                  label={t('create_widget.fields.duration')}
                  type={TextType.text}
                  className={cn(styles.field, 'd-flex flex-column mb-2')}
                />
                <Field
                  name='refresh'
                  label={t('create_widget.fields.refresh')}
                  type={TextType.text}
                  className={cn(styles.field, 'd-flex flex-column mb-2')}
                />
              </Panel>
            </div>

            <Widget
              className={styles.widget}
              id={null!}
              isWidgetEdit
              chartType={!isCreate ? widget?.chartType : initialValues.chartType}
              widgetType={!isCreate ? widget?.widgetType : initialValues.widgetType}
              chartStyles={!isCreate ? widget?.styles : initialValues.styles}
              watchers={[]}
              duration={widget?.duration}
              refreshTime={widget?.refreshTime}
            />
          </div>

          <div className={styles.controllersZone}>
            <Panel className={styles.type}>
              <Field
                name='parser'
                label={t('create_watcher.fields.parser')}
                type='select'
                value={widgetTypeOptions[0]?.value || 'NONE'}
                options={widgetTypeOptions}
                className={cn(styles.field, 'd-flex flex-column mb-2')}
              />
            </Panel>
            <Panel className={styles.blocks}>
              <div className={styles.scrollable}>
              </div>
            </Panel>
          </div>
        </div>
      </FormProvider>
    </>
  );
};
