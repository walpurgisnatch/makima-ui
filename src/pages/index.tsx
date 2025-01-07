import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';

import { Dashboard } from './dashboard';
import { ContentLayout } from '@layouts';
import { ROUTE_IDS, ROUTES } from '@shared/constants';
import { WatcherDetails } from './watcher';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Navigate to={ROUTES.dashboard.url} />} />

      <Route element={<ContentLayout />}>
        <Route path={ROUTES.dashboard.url} Component={Dashboard} />
        <Route path={':watcherName'} Component={WatcherDetails} id={ROUTE_IDS.watcherDetails} />
      </Route>
    </Route>
  )
);
