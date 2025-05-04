import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Loader } from '@shared/ui';
import { isLoading } from '@shared/lib';
import { dashboardsThunk, selectDashboardStatus } from '@entities/dashboards';
import { resetDashboards } from '@entities/dashboards/store';
import { useParams } from 'react-router-dom';

export const DashboardDisplay = () => {
  const dispatch = useAppDispatch();
  const { dashboardName } = useParams();
  const loading = isLoading(useAppSelector(selectDashboardStatus));

  useEffect(() => {
    dashboardName && dispatch(dashboardsThunk.get(dashboardName));

    return () => {
      dispatch(resetDashboards);
    };
  }, [dashboardName, dispatch]);

  return (
    <>
      <h2>{dashboardName}</h2>

      {loading ? <Loader /> : <div></div>}
    </>
  );
};
