import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TGetPokemonCardResponse } from "src/shared/api/types"

type TPokemonCardState = {
    pokemon: TGetPokemonCardResponse | null;
}

const initialPokemonCardState: TPokemonCardState = {
    pokemon: null,
}

export const {
    reducer: pokemonDetailsReducer,
    actions: { savePokemonInfo },
} = createSlice({
    name: 'pokemonDetails',
    initialState: initialPokemonCardState,
    reducers: {
        savePokemonInfo: (_state, { payload }: PayloadAction<TGetPokemonCardResponse>) => ({
            pokemon: payload,
        })
    }
})
