export type TGetPokemonListRequest = {
    pageSize: number;
    pageNumber: number | string;
}

export type TPokemonListItem = {
    name: string;
    url: string;
}

export type TGetPokemonListResponse = {
    count: number | null;
    next: string | null;
    previous: string | null;
    results: Array<TPokemonListItem>;
}

type TBaseItem = { name: string; url: string; }

type TAbility = {
    is_hidden: boolean;
    slot: number;
    ability: TBaseItem;
}

type TGameIndex = {
    game_index: number;
    version: TBaseItem;
}

type TVersionDetails = {
    rarity: number;
    version: TBaseItem;
}

type THeldItem = {
    item: TBaseItem;
    version_details: Array<TVersionDetails>;
}

type TType = {
    slot: number;
    type: TBaseItem;
}

type TPassType = {
    generation: TBaseItem;
    types: Array<TType>;
}

type TStat = {
    base_stat: number;
    effort: number;
    stat: TBaseItem;
}

type TCry = {
    latest: string;
    legacy: string;
}

type TSprite = {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
}

type TVersionGroupDetails = {
    level_learned_at: number;
    version_group: TBaseItem;
    move_learn_method: TBaseItem;
}

type TMove = {
    move: TBaseItem;
    version_group_details: Array<TVersionGroupDetails>;
}

export type TGetPokemonCardResponse = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Array<TAbility>;
    forms: Array<TBaseItem>;
    game_indices: Array<TGameIndex>;
    held_items: Array<THeldItem>;
    location_area_encounters: string;
    moves: Array<TMove>;
    species: TBaseItem;
    sprites: TSprite;
    cries: TCry;
    stats: Array<TStat>;
    types: Array<TType>;
    past_types: Array<TPassType>;
}
