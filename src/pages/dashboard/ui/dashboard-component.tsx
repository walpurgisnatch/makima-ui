import React from 'react';

import { TITLE } from '@shared/constants';
import { useLocale } from '@shared/hooks';
import { WatchersPanel } from '@widgets';

export const Dashboard = () => {
  const { messages } = useLocale();

  return (
    <div>
      <h1>{messages.pages.dashboard[TITLE]}</h1>

      <WatchersPanel />
    </div>
  );
};
