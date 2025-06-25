import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { CloseCircleOutlined, EditOutlined } from '@ant-design/icons';

import { dashboardsThunk, selectDashboard, resetDashboards } from '@entities/dashboards';
import { useAppDispatch, useAppSelector, useLocale } from '@shared/hooks';
import { HeaderActions } from '@shared/ui';
import { WidgetsPanel } from '@widgets';

export const DashboardDisplay = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useLocale();
  const { dashboardName } = useParams();
  const dashboard = useAppSelector(selectDashboard);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (dashboardName) {
      dispatch(dashboardsThunk.get(dashboardName));
    }

    return () => {
      dispatch(resetDashboards);
    };
  }, [dashboardName, dispatch]);

  const editMode = () => {
    setIsEdit(!isEdit);
  };

  return (
    <>
      <HeaderActions title={dashboard.name}>
        <Button title={t('general.add')} onClick={() => navigate('./widgets/create')}>
          {t('general.add')}
        </Button>
        {!isEdit ? (
          <Button title={t('general.edit')} icon={<EditOutlined />} onClick={editMode} />
        ) : (
          <Button title={t('general.exit')} icon={<CloseCircleOutlined />} onClick={editMode} />
        )}
      </HeaderActions>

      <WidgetsPanel dashboard={dashboardName} isEdit={isEdit} />
    </>
  );
};
