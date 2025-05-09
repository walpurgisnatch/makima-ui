import { createSlice } from '@reduxjs/toolkit';

import { defaultPending, defaultRejected, LoadingStatuses } from '@shared/api';
import { watchersThunk } from '@entities/watchers';
import type { State } from '@shared/types';
import { TFields } from '../model/types';

const initialState: State<TFields> = {
    data: {
        parser: [],
    },
    status: LoadingStatuses.Idle,
    error: null,
};

const watcherFields = createSlice({
    name: 'fields',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(watchersThunk.getParsers.fulfilled, (state, { payload }) => {
            state.data.parser = payload;
            state.status = LoadingStatuses.Succeeded;
        })
        builder.addCase(watchersThunk.getParsers.pending, defaultPending);
        builder.addCase(watchersThunk.getParsers.rejected, defaultRejected);
    },
});

export const watcherFieldsReducer = watcherFields.reducer;
