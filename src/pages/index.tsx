import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';

import { ContentLayout } from '@layouts';
import { ROUTE_IDS, ROUTES } from '@shared/constants';
import { Home } from './home';
import { WatcherDetails } from './watcher-details';
import { CreateWatcher } from './create-watcher';
import { DashboardList } from './dashboard';
import { DashboardDisplay } from './dashboard/display';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Navigate to={ROUTES.Home.url} />} />

      <Route element={<ContentLayout />}>
        <Route path={ROUTES.Home.url} Component={Home} />
        <Route path={'/watchers/:watcherName'} Component={WatcherDetails} id={ROUTE_IDS.watcherDetails} />
        <Route path={ROUTES.CreateWatcher.url} Component={CreateWatcher} />

        <Route path={ROUTES.Dashboards.url} Component={DashboardList} />
        <Route path={'/dashboards/:dashboardName'} Component={DashboardDisplay} id={ROUTE_IDS.dashboard} />
      </Route>
    </Route>
  )
);
