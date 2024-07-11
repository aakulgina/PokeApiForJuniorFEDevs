export const links = {
    base: '/',

    failure: (code: string | number) => `/${code}`,

    list: (page?: string) => `/pokemons/list${page ? '/' + page.toString() : ''}`,

    card: (name: string) => `/pokemons/card/${name}`,
} as const;
