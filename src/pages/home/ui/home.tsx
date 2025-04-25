import React from 'react';

import { TITLE } from '@shared/constants';
import { useLocale } from '@shared/hooks';
import { WatchersPanel } from '@widgets';

export const Home = () => {
  const { messages } = useLocale();

  return (
    <div>
      <h1>{messages.pages.home[TITLE]}</h1>

      <WatchersPanel />
    </div>
  );
};
