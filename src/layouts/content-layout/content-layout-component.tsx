import React from 'react';
import { Outlet } from 'react-router-dom';

export const ContentLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
