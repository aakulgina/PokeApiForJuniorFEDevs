import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TGetPokemonListResponse } from "src/shared/api/types";

const initialPokeListstate = {
    data: {
        count: null,
        next: null,
        previous: null,
        results: [],
    } as TGetPokemonListResponse,
    page: 1,
    pageSize: 10,
}

type TPaginationPayload = {
    page: number,
    pageSize: number,
}

export const {
    reducer: pokeListReducer,
    actions: { saveList, savePagination }
} = createSlice({
    name: 'pokeList',
    initialState: initialPokeListstate,
    reducers: {
        saveList: (state, { payload }: PayloadAction<TGetPokemonListResponse>) => ({
            ...state,
            data: { ...payload },
        }),
        savePagination: (state, { payload }: PayloadAction<TPaginationPayload>) => ({
            ...state,
            ...payload,
        }),
    }
})