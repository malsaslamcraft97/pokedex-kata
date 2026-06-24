import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonDetails } from "../types/pokemonDetails";
import { PokemonSpecies } from "../types/pokemonSpecies";
import {
  EnrichedPokemon,
  RawPokemonDetail,
  enrichPokemon,
} from "../domain/pokemonTransformers";

export type { EnrichedPokemon };

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  endpoints: (builder) => ({
    getPokemon: builder.query<{ results: { name: string }[] }, void>({
      query: () => "pokemon",
    }),
    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (name) => `pokemon/${name}`,
    }),
    getPokemonListWithDetails: builder.query<
      EnrichedPokemon[],
      { offset: number }
    >({
      async queryFn(_arg, _queryApi, _extraOptions, baseQuery) {
        const listResult = await baseQuery(
          `pokemon?offset=${_arg.offset}&limit=20`
        );

        if (listResult.error) {
          return { error: listResult.error };
        }

        const listData = listResult.data as {
          results: { name: string }[];
        };

        const enriched = await Promise.all(
          listData.results.map(async (pokemon) => {
            const detailResult = await baseQuery(`pokemon/${pokemon.name}`);

            if (detailResult.error) {
              throw detailResult.error;
            }

            return enrichPokemon(detailResult.data as RawPokemonDetail);
          })
        );

        return { data: enriched };
      },

      serializeQueryArgs: ({ endpointName }) => endpointName,

      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.offset !== previousArg?.offset;
      },
    }),
    getPokemonSpecies: builder.query<PokemonSpecies, string>({
      query: (name) => `https://pokeapi.co/api/v2/pokemon-species/${name}`,
    }),
  }),
});
