import React from 'react';

import { useLocale } from '@shared/hooks';
import { WatchersPanel } from '@widgets';

export const Home = () => {
  const { t } = useLocale();

  return (
    <div>
      <h1>{t('pages.home.title')}</h1>

      <WatchersPanel />
    </div>
  );
};
