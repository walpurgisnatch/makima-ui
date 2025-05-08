import React, { useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';

import { useAppDispatch, useAppSelector, useLocale } from '@shared/hooks';
import { Panel, HeaderActions } from '@shared/ui';
import { COLUMNS } from './constants';
import { isLoading } from '@shared/lib';
import { dashboardsThunk, selectDashboards, selectDashboardsStatus } from '@entities/dashboards';
import { resetDashboards, TDashboard } from '@entities/dashboards';
import CreateDashboard from './DashboardModal';

export const DashboardList = () => {
  const { t } = useLocale();
  const dispatch = useAppDispatch();
  const loading = isLoading(useAppSelector(selectDashboardsStatus));
  const dataSource = useAppSelector(selectDashboards);
  const [openId, setOpenId] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    dispatch(dashboardsThunk.getAll());

    return () => {
      dispatch(resetDashboards);
    };
  }, [dispatch]);

  const openData = useMemo(
    () => (openId ? dataSource.find((item: TDashboard) => item.name === openId) : undefined),
    [dataSource, openId]
  );

  const editDashboardHandler = (name: string) => {
    setOpenId(name);
  };

  const deleteDashboardHandler = (name: string) => {
    dispatch(dashboardsThunk.delete(name));
  };

  const modalChangeHandler = async (data: TDashboard) => {
    if (openId) {
      await dispatch(dashboardsThunk.update({ name: openId, data }));
    } else {
      await dispatch(dashboardsThunk.create(data));
    }
    dispatch(dashboardsThunk.getAll());
    setOpenId(undefined);
  };

  return (
    <>
      <HeaderActions title={t('dashboards.title')}>
        <Button type='primary' icon={<PlusOutlined />} onClick={() => setOpenId(null)} />
      </HeaderActions>

      <Panel>
        <Table
          loading={loading}
          columns={COLUMNS(deleteDashboardHandler, editDashboardHandler)}
          dataSource={dataSource}
          rowKey={(dashboard) => dashboard.name}
        />
      </Panel>
      <CreateDashboard
        openId={openId}
        data={openData}
        onChange={modalChangeHandler}
        onClose={() => setOpenId(undefined)}
      />
    </>
  );
};

export default DashboardList;
