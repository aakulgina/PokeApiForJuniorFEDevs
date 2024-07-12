export const links = {
    base: '/PokeApiForJuniorFEDevs/',

    failure: (code: string | number) => `/PokeApiForJuniorFEDevs/${code}`,

    list: (page?: string) => `/PokeApiForJuniorFEDevs/pokemons/list${page ? '/' + page.toString() : ''}`,

    card: (name: string) => `/PokeApiForJuniorFEDevs/pokemons/card/${name}`,
} as const;
