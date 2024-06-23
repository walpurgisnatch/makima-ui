import { TITLE } from '@shared/constants';
import { useLocale } from '@shared/hooks';
import React from 'react';

export const Dashboard = () => {
  const { messages } = useLocale();

  return <h1>{messages.pages.dashboard[TITLE]}</h1>;
};
