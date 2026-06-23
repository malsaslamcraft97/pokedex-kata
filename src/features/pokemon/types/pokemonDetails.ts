export interface PokemonAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;

  types: {
    slot: number;
    type: {
      name: string;
    };
  }[];

  abilities: {
    ability: {
      name: string;
    };
    is_hidden: boolean;
  }[];

  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];

  sprites: {
    other?: {
      "official-artwork"?: {
        front_default?: string;
      };
    };
  };
}
