export type EnrichedPokemon = {
  id: number;
  formattedId: string;
  name: string;
  image: string;
  types: string[];
  ability?: string;
  height?: number;
};

export type RawPokemonDetail = {
  id: number;
  name: string;
  height: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean }[];
  sprites: {
    other: {
      home?: { front_default?: string | null };
      "official-artwork"?: { front_default?: string | null };
    };
  };
};

export function enrichPokemon(detail: RawPokemonDetail): EnrichedPokemon {
  return {
    id: detail.id,
    formattedId: `N°${String(detail.id).padStart(3, "0")}`,
    name: detail.name.charAt(0).toUpperCase() + detail.name.slice(1),
    image:
      detail.sprites.other["home"]?.front_default ??
      detail.sprites.other["official-artwork"]?.front_default ??
      "",
    types: detail.types.map(
      (t) => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)
    ),
    ability: detail.abilities?.[0]?.ability?.name
      ? detail.abilities[0].ability.name
          .replace("-", " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      : undefined,
    height: detail.height,
  };
}
