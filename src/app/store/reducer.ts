import { combineReducers } from "@reduxjs/toolkit/react"
import { globalReducer as global } from "src/entities/global/model/slice"
import { pokemonDetailsReducer as pokemonDetails } from "src/entities/poke/model/slice"
import { pokeListReducer as pokeList } from "src/entities/pokeList/model/slice"
import { reducerPath as apiPath, reducer as apiReducer } from "src/shared/api" 

export const reducers = {
    pokeList,
    pokemonDetails,
    global,
    [apiPath]: apiReducer,
}

export const reducer = combineReducers(reducers)
