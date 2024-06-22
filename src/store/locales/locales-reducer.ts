import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { IInitialState, TLocales, TSetMessagesProps } from './locales-types';

const initialState: IInitialState = {
  locales: {},
  messages: {},
};

const localesSlice = createSlice({
  name: 'locales',
  initialState,
  reducers: {
    setLocales: (state, action: PayloadAction<TLocales>) => {
      state.locales = action.payload;
    },
    setMessages: (state, action: PayloadAction<TSetMessagesProps>) => {
      state.messages[action.payload.code] = action.payload.messages;
    },
  },
});

export const { setLocales, setMessages } = localesSlice.actions;

export const localesReducer = localesSlice.reducer;
