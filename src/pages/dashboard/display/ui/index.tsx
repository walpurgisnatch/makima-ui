import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

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

  useEffect(() => {
    if (dashboardName) {
      dispatch(dashboardsThunk.get(dashboardName));
    }

    return () => {
      dispatch(resetDashboards);
    };
  }, [dashboardName, dispatch]);

  const editMode = () => {
    console.log('edit');
  };

  return (
    <>
      <HeaderActions title={dashboard.name}>
        <Button title={t('general.add')} onClick={() => navigate('./widgets/create')}>
          {t('general.add')}
        </Button>
        <Button title={t('general.edit')} icon={<EditOutlined />} onClick={editMode} />
      </HeaderActions>

      <WidgetsPanel dashboard={dashboardName} />
    </>
  );
};
