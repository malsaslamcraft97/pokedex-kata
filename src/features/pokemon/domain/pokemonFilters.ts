import { EnrichedPokemon } from "./pokemonTransformers";

export function filterBySearch(
  list: EnrichedPokemon[],
  searchText: string
): EnrichedPokemon[] {
  if (!searchText) return list;
  return list.filter((p) =>
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );
}

export function filterByType(
  list: EnrichedPokemon[],
  selectedTypes: string[]
): EnrichedPokemon[] {
  if (selectedTypes.length === 0) return list;
  const lowerTypes = selectedTypes.map((t) => t.toLowerCase());
  return list.filter((p) =>
    p.types.some((type) => lowerTypes.includes(type.toLowerCase()))
  );
}

export function filterByAbility(
  list: EnrichedPokemon[],
  ability: string
): EnrichedPokemon[] {
  if (!ability) return list;
  return list.filter(
    (p) => p.ability && p.ability.toLowerCase() === ability.toLowerCase()
  );
}
