import { EnrichedPokemon } from "./pokemonTransformers";

export function sortByHeight(
  list: EnrichedPokemon[],
  direction: "asc" | "desc"
): EnrichedPokemon[] {
  return [...list].sort((a, b) =>
    direction === "asc"
      ? (a.height ?? 0) - (b.height ?? 0)
      : (b.height ?? 0) - (a.height ?? 0)
  );
}

export function sortById(
  list: EnrichedPokemon[],
  direction: "asc" | "desc"
): EnrichedPokemon[] {
  return [...list].sort((a, b) =>
    direction === "asc" ? a.id - b.id : b.id - a.id
  );
}

export function sortByName(
  list: EnrichedPokemon[],
  direction: "asc" | "desc"
): EnrichedPokemon[] {
  return [...list].sort((a, b) =>
    direction === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );
}

export function applySort(
  list: EnrichedPokemon[],
  sortBy: string,
  height: string
): EnrichedPokemon[] {
  let result = [...list];

  if (height === "height_asc") result = sortByHeight(result, "asc");
  if (height === "height_desc") result = sortByHeight(result, "desc");

  switch (sortBy) {
    case "id_asc":
      return sortById(result, "asc");
    case "id_desc":
      return sortById(result, "desc");
    case "name_asc":
      return sortByName(result, "asc");
    case "name_desc":
      return sortByName(result, "desc");
    default:
      return result;
  }
}
