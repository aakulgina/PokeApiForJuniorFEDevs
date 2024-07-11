import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "src/app/store";

export const pokemonsListSelector = createSelector(
    ({ pokeList }: AppState) => pokeList,
    (pokeList) => pokeList,
)
