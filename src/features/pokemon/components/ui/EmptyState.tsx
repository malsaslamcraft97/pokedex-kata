import styles from "./EmptyState.module.scss";

type Props = {
  searchText: string;
  hasActiveFilters: boolean;
  onSearch: (value: string) => void;
};

export default function EmptyState({
  searchText,
  hasActiveFilters,
  onSearch,
}: Props) {
  const showSearch = searchText !== "";
  const showFilters = hasActiveFilters;

  return (
    <div className={styles.emptyState}>
      <div className={styles.pokeball}>
        <div className={styles.center} />
      </div>

      <h3>No Pokémon Found</h3>

      {showSearch && !showFilters && (
        <p>
          We couldn’t find any Pokémon matching <span>"{searchText}"</span>,
          Try:{" "}
          <button
            className={styles.tryPokemon}
            onClick={() => onSearch("bulbasaur")}
          >
            bulbasaur
          </button>{" "}
          or{" "}
          <button
            className={styles.tryPokemon}
            onClick={() => onSearch("charmander")}
          >
            charmander
          </button>
        </p>
      )}

      {showFilters && !showSearch && (
        <p>We couldn’t find any Pokémon matching your filters</p>
      )}

      {showSearch && showFilters && (
        <p>
          We couldn’t find any Pokémon matching <span>"{searchText}"</span> and
          selected filters
        </p>
      )}

      {showSearch && (
        <button className={styles.clearButton} onClick={() => onSearch("")}>
          Clear Search
        </button>
      )}
    </div>
  );
}
