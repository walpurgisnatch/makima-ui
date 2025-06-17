import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { dashboardsThunk, selectDashboard, selectDashboardStatus, resetDashboards } from '@entities/dashboards';
import { IWidgetData, selectWidgets, Widget, widgetsThunk } from '@entities/widgets';
import { useAppDispatch, useAppSelector, useLocale } from '@shared/hooks';
import { HeaderActions, Loader } from '@shared/ui';
import { isLoading } from '@shared/lib';

import styles from './styles.module.scss';

export const DashboardDisplay = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useLocale();
  const { dashboardName } = useParams();
  const dashboard = useAppSelector(selectDashboard);
  const widgets = useAppSelector(selectWidgets);
  const loading = isLoading(useAppSelector(selectDashboardStatus));

  useEffect(() => {
    if (dashboardName) {
      dispatch(dashboardsThunk.get(dashboardName));
      dispatch(widgetsThunk.select(dashboardName));
    }

    return () => {
      dispatch(resetDashboards);
    };
  }, [dashboardName, dispatch]);

  const editMode = () => {
    console.log('edit');
  };

  console.log(widgets);

  return (
    <>
      <HeaderActions title={dashboard.name}>
        <Button title={t('general.add')} onClick={() => navigate('./widgets/create')}>
          {t('general.add')}
        </Button>
        {/* <Button title={t('general.edit')} icon={<EditOutlined />} onClick={editMode} /> */}
      </HeaderActions>

      {loading ? (
        <Loader />
      ) : (
        <div className={styles.wrapper}>
          {widgets.map((widget: IWidgetData) => (
            <Widget
              key={widget.id}
              id={widget.id}
              className={styles.widgetWrapper}
              width={widget.width}
              height={widget.height}
              chartType={widget.chartType}
              widgetType={widget.widgetType}
              chartStyles={widget.styles}
              duration={widget.duration}
              refreshTime={widget.refresh}
              isEditable
            />
          ))}
        </div>
      )}
    </>
  );
};
