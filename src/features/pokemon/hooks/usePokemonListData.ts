import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { pokemonApi } from "../api/pokemonApi";
import { setPageOffset } from "../store/uiSlice";
import {
  filterBySearch,
  filterByType,
  filterByAbility,
} from "../domain/pokemonFilters";
import { applySort } from "../domain/pokemonSorters";
import useInfiniteScroll from "./useInfiniteScroll";

export default function usePokemonListData() {
  const dispatch = useAppDispatch();
  const searchText = useAppSelector((state) => state.pokemonUI.searchText);
  const filters = useAppSelector((state) => state.pokemonUI.filters);
  const pageOffset = useAppSelector((state) => state.pokemonUI.pageOffset);

  const { data, isLoading, isFetching } =
    pokemonApi.useGetPokemonListWithDetailsQuery({ offset: pageOffset });

  const hasActiveFilters = filters.type !== "" || filters.ability !== "";

  const processedList = useMemo(() => {
    if (!data) return [];

    let list = filterBySearch(data, searchText);

    if (filters.type) {
      list = filterByType(list, filters.type.split(","));
    }

    if (filters.ability) {
      list = filterByAbility(list, filters.ability);
    }

    return applySort(list, filters.sortBy, filters.height);
  }, [data, searchText, filters]);

  const { loadMoreRef } = useInfiniteScroll({
    onLoadMore: () => dispatch(setPageOffset(pageOffset + 20)),
    disabled: isFetching || hasActiveFilters,
  });

  return {
    dispatch,
    searchText,
    filters,
    processedList,
    isLoading,
    isFetching,
    data,
    loadMoreRef,
  };
}
