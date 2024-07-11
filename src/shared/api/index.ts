import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TGetPokemonListResponse, TGetPokemonListRequest, TGetPokemonCardResponse } from "./types";

export const {
    reducer, reducerPath, middleware,
    useLazyGetPokemonListQuery, useLazyGetPokemonCardQuery,
} = createApi({
    reducerPath: 'app',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon' }),
    endpoints: (builder) => ({
        getPokemonList: builder.query<TGetPokemonListResponse, TGetPokemonListRequest>({
            query: ({ pageNumber, pageSize }: TGetPokemonListRequest) => ({
                url: `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${Number(pageNumber) - 1}`,
                method: 'GET',
            })
        }),
        getPokemonCard: builder.query<TGetPokemonCardResponse, string>({
            query: (name: string) => ({
                url: `https://pokeapi.co/api/v2/pokemon/${name}`,
                method: 'GET',
            })
        })
    })
})
