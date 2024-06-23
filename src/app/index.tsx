import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { router } from '@pages';
import { ThemeProvider } from './theme-provider';
import { LocaleProvider } from './locale-provider';
import { store } from '@store/store';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ThemeProvider>
      <LocaleProvider>
        <RouterProvider router={router} />
      </LocaleProvider>
    </ThemeProvider>
  </Provider>
);
