import React, { useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Modal, Space } from 'antd';
import cn from 'classnames';

import { useLocale } from '@shared/hooks';
import { TDashboard } from '@entities/dashboards/store';
import { initialValues } from './constants';
import { Field, TextType } from '@shared/ui';

import styles from './styles.module.scss';

interface DashboardModalProps {
  openId: string | null | undefined;
  data?: TDashboard;
  isLoading?: boolean;
  onClose: () => void;
  onChange: (data: TDashboard) => void;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({ openId, data, isLoading, onClose, onChange }) => {
  const { t } = useLocale();

  const formMethods = useForm({
    mode: 'onChange',
    defaultValues: initialValues,
  });
  const {
    handleSubmit,
    reset,
    formState: { isValid },
  } = formMethods;

  useEffect(() => {
    if (openId === null) {
      reset(initialValues);
    }
  }, [reset, openId]);

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [reset, data]);

  const onSubmit: SubmitHandler<TDashboard> = (data) => {
    onChange(data);
  };

  return (
    <Modal
      loading={isLoading}
      open={openId !== undefined}
      title={t(`dashboards.list.${openId ? 'editTitle' : 'createTitle'}`)}
      okText={t(`general.save`)}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      okButtonProps={{
        disabled: !isValid,
      }}
    >
      <FormProvider {...formMethods}>
        <form>
          <Space>
            <Field
              name='name'
              label={t('dashboards.list.fields.name')}
              type={TextType.text}
              className={cn(styles.field, 'd-flex flex-column mb-2')}
            />
            <Field
              name='description'
              label={t('dashboards.list.fields.description')}
              type={TextType.text}
              className={cn(styles.field, 'd-flex flex-column mb-2')}
            />
          </Space>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default DashboardModal;
