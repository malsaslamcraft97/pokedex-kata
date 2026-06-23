import { EnrichedPokemon } from "../../api/pokemonApi";

import PokemonCard from "./PokemonCard";
import styles from "./PokemonList.module.scss";

export default function PokemonList({
  pokemons,
}: {
  pokemons: EnrichedPokemon[];
}) {
  return (
    <div className={styles.cardList}>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          image={pokemon.image}
          formattedId={pokemon.formattedId}
          name={pokemon.name}
          types={pokemon.types}
          ability={pokemon.ability}
          height={pokemon.height}
        />
      ))}
    </div>
  );
}
