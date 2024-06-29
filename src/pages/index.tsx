import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router-dom';

import { Dashboard } from './dashboard';
import { ContentLayout } from '@layouts';
import { ROUTES } from '@shared/constants';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Navigate to={ROUTES.dashboard.url} />} />

      <Route element={<ContentLayout />}>
        <Route path={ROUTES.dashboard.url} Component={Dashboard} />
      </Route>
    </Route>
  )
);
