import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "src/app/store";

export const pokemonDetailsSelector = createSelector(
    ({ pokemonDetails }: AppState) => pokemonDetails.pokemon,
    (pokemon) => {
        if (pokemon) {
            return {
                id: pokemon.id,
                name: pokemon.name,
                baseExp: pokemon['base_experience'],
                height: pokemon.height,
                weight: pokemon.weight,
                abilities: pokemon.abilities.map(item => item.ability.name),
                heldItems: pokemon['held_items'].map(item => item.item.name),
                moves: pokemon.moves.map(item => item.move.name),
                sprites: [
                    pokemon.sprites['back_default'] ?? pokemon.sprites['back_female'],
                    pokemon.sprites['front_default'] ?? pokemon.sprites['front_female'],
                    pokemon.sprites['back_shiny'] ?? pokemon.sprites['back_shiny_female'],
                    pokemon.sprites['front_shiny'] ?? pokemon.sprites['front_shiny_female'],
                ],
                cries: pokemon.cries.latest,
                stats: pokemon.stats.map(item => ({
                    base: item['base_stat'],
                    name: item.stat.name,
                }))
            }
        } else {
            return null;
        }
    },
)