import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';

import { ContentLayout } from '@layouts';
import { ROUTE_IDS, ROUTES } from '@shared/constants';
import { Home } from './home';
import { WatcherDetails } from './watcher-details';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Navigate to={ROUTES.Home.url} />} />

      <Route element={<ContentLayout />}>
        <Route path={ROUTES.Home.url} Component={Home} />
        <Route path={':watcherName'} Component={WatcherDetails} id={ROUTE_IDS.watcherDetails} />
      </Route>
    </Route>
  )
);
