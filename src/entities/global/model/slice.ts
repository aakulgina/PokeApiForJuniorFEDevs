import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialGlobalState = {
    errorCode: null as number | string | null,
}

export const {
    reducer: globalReducer,
    actions: { saveErrorCode }
} = createSlice({
    name: 'global',
    initialState: initialGlobalState,
    reducers: {
        saveErrorCode: (state, { payload }: PayloadAction<number | string | null>) => ({
            ...state,
            errorCode: payload,
        }),
    }
})