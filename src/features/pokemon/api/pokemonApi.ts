import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonDetails } from "../types/pokemonDetails";
import { PokemonSpecies } from "../types/pokemonSpecies";

export type EnrichedPokemon = {
  id: number;
  formattedId: string;
  name: string;
  image: string;
  types: string[];
  ability?: string;
  height?: number;
};

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

            const detail = detailResult.data as any;

            return {
              id: detail.id,
              formattedId: `N°${String(detail.id).padStart(3, "0")}`,
              name: detail.name.charAt(0).toUpperCase() + detail.name.slice(1),
              image:
                detail.sprites.other["home"]?.front_default ??
                detail.sprites.other["official-artwork"].front_default,
              types: detail.types.map(
                (t: any) =>
                  t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
              ),
              ability: detail.abilities?.[0]?.ability?.name
                ? detail.abilities[0].ability.name
                    .replace("-", " ")
                    .replace(/\b\w/g, (c: string) => c.toUpperCase())
                : undefined,
              height: detail.height,
            };
          })
        );

        return { data: enriched };
      },

      // 👇 make all pages share same cache key
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      // 👇 merge new page with existing cache
      merge: (currentCache, newItems) => {
        currentCache.push(...newItems);
      },

      // 👇 refetch when offset changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.offset !== previousArg?.offset;
      },
    }),
    getPokemonSpecies: builder.query<PokemonSpecies, string>({
      query: (name) => `https://pokeapi.co/api/v2/pokemon-species/${name}`,
    }),
  }),
});
