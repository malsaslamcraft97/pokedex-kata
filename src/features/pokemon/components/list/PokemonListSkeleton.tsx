import PokemonCardSkeleton from "./PokemonCardSkeleton";
import styles from "./PokemonList.module.scss";

export default function PokemonListSkeleton({ small }: { small?: boolean }) {
  const count = small ? 4 : 12;

  return (
    <div className={styles.cardList}>
      {Array.from({ length: count }).map((_, index) => (
        <PokemonCardSkeleton key={index} />
      ))}
    </div>
  );
}
