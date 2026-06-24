import styles from "./PokemonListPage.module.scss";
import { Search } from "lucide-react";
import {
  PokemonList,
  PokemonListSkeleton,
  EmptyState,
  ActionToolbar,
} from "../components";

import { setSearchText } from "../store/uiSlice";
import usePokemonListData from "../hooks/usePokemonListData";
import useUrlFilterSync from "../hooks/useUrlFilterSync";

export default function PokemonListPage() {
  useUrlFilterSync();

  const {
    dispatch,
    searchText,
    filters,
    processedList,
    isLoading,
    isFetching,
    data,
    loadMoreRef,
  } = usePokemonListData();

  const showInitialLoader = isLoading && !data;

  return (
    <div className={styles.container}>
      <header>
        <h1>
          Pokédex
          <span className={styles.redDot} />
        </h1>

        <div className={styles.heroAccent} />

        <h2>Search and explore Pokémon</h2>
      </header>

      <div className={styles.searchBar}>
        <input
          type="search"
          placeholder="Search your Pokemon!"
          value={searchText}
          onChange={(e) => dispatch(setSearchText(e.target.value))}
        />
        <button className={styles.searchButton}>
          <Search size={24} color="white" strokeWidth={2.75} />
        </button>
      </div>

      <ActionToolbar />

      {showInitialLoader ? (
        <PokemonListSkeleton />
      ) : processedList.length === 0 ? (
        <EmptyState
          searchText={searchText}
          onSearch={(val) => dispatch(setSearchText(val))}
          hasActiveFilters={filters.type !== "" || filters.ability !== ""}
        />
      ) : (
        <>
          <PokemonList pokemons={processedList} />

          {isFetching && data && (
            <div className={styles.bottomLoader}>
              <PokemonListSkeleton small />
            </div>
          )}

          <div ref={loadMoreRef} className={styles.loadTrigger} />
        </>
      )}
    </div>
  );
}
