export type PokemonSpecies = {
  id: number;
  order: number;
  name: string;
  gender_rate: number; // 0–8 scale
  egg_groups: {
    name: string;
  }[];
  hatch_counter: number;
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
};
