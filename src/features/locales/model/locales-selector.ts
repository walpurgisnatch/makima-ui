import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '@store/store';

export const getLocalesState = (state: RootState) => state.locales;

export const getLocalesSelector = createSelector(getLocalesState, (localesState) => localesState.locales);

export const getMessagesSelector = createSelector(getLocalesState, (localesState) => localesState.messages);
