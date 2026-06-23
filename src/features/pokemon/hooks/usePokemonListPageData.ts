import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { pokemonApi } from "../api/pokemonApi";
import { useEffect, useMemo, useRef } from "react";
import {
  setFilterFromUrl,
  setFilters,
  setPageOffset,
  setSearchText,
} from "../store/uiSlice";
import buildFilterQueryParams from "../utils/buildFilterQueryParams";
import { useSearchParams } from "react-router-dom";

export default function usePokemonListPageData() {
  const dispatch = useAppDispatch();

  const searchText = useAppSelector((state) => state.pokemonUI.searchText);
  const filters = useAppSelector((state) => state.pokemonUI.filters);
  const pageOffset = useAppSelector((state) => state.pokemonUI.pageOffset);

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, isFetching } =
    pokemonApi.useGetPokemonListWithDetailsQuery({
      offset: pageOffset,
    });

  const hasActiveFilters = filters.type !== "" || filters.ability !== "";
  const stateRef = useRef({
    pageOffset,
    isFetching,
    hasActiveFilters,
  });

  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMoreRef = (node: HTMLDivElement | null) => {
    if (!node) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        const { pageOffset, isFetching, hasActiveFilters } = stateRef.current;

        if (isFetching || hasActiveFilters) return;

        dispatch(setPageOffset(pageOffset + 20));
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observerRef.current.observe(node);
  };

  const processedList = useMemo(() => {
    if (!data) return [];

    let list = [...data];

    if (searchText) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filters.type) {
      const selectedTypes = filters.type.split(",");

      list = list.filter((p) =>
        p.types.some((type) => selectedTypes.includes(type.toLowerCase()))
      );
    }

    if (filters.ability) {
      list = list.filter(
        (p) =>
          p.ability && p.ability.toLowerCase() === filters.ability.toLowerCase()
      );
    }

    if (filters.height === "height_asc") {
      list.sort((a, b) => (a.height ?? 0) - (b.height ?? 0));
    }

    if (filters.height === "height_desc") {
      list.sort((a, b) => (b.height ?? 0) - (a.height ?? 0));
    }

    switch (filters.sortBy) {
      case "id_asc":
        list.sort((a, b) => a.id - b.id);
        break;

      case "id_desc":
        list.sort((a, b) => b.id - a.id);
        break;

      case "name_asc":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "name_desc":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return list;
  }, [data, searchText, filters]);

  useEffect(() => {
    const searchTermParam = searchParams.get("search");
    const typeParam = searchParams.get("type");
    const abilityParam = searchParams.get("abilities");

    if (searchTermParam) {
      dispatch(setSearchText(searchTermParam));
    }

    if (typeParam) {
      const uniqueTypes = [...new Set(typeParam.split(","))].join(",");
      dispatch(setFilterFromUrl({ key: "type", value: uniqueTypes }));
    }

    if (abilityParam) {
      const uniqueAbilities = [...new Set(abilityParam.split(","))].join(",");
      dispatch(setFilterFromUrl({ key: "ability", value: uniqueAbilities }));
    }
  }, []);

  useEffect(() => {
    stateRef.current = {
      pageOffset,
      isFetching,
      hasActiveFilters,
    };
  }, [pageOffset, isFetching, hasActiveFilters]);

  const hasHydratedFromUrl = useRef(false);

  useEffect(() => {
    if (!hasHydratedFromUrl.current) {
      hasHydratedFromUrl.current = true;
      return;
    }

    const params = buildFilterQueryParams({
      search: searchText,
      type: filters.type,
      abilities: filters.ability,
    });

    setSearchParams(params);
  }, [filters.type, filters.ability, searchText]);

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
