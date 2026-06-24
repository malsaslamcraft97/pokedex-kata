import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setFilterFromUrl, setSearchText } from "../store/uiSlice";
import buildFilterQueryParams from "../utils/buildFilterQueryParams";

export default function useUrlFilterSync() {
  const dispatch = useAppDispatch();
  const searchText = useAppSelector((state) => state.pokemonUI.searchText);
  const filters = useAppSelector((state) => state.pokemonUI.filters);
  const [searchParams, setSearchParams] = useSearchParams();
  const hasHydratedFromUrl = useRef(false);

  // Hydrate Redux state from URL params on mount
  useEffect(() => {
    const searchTermParam = searchParams.get("search");
    const typeParam = searchParams.get("type");
    const abilityParam = searchParams.get("abilities");

    if (searchTermParam) dispatch(setSearchText(searchTermParam));

    if (typeParam) {
      const uniqueTypes = [...new Set(typeParam.split(","))].join(",");
      dispatch(setFilterFromUrl({ key: "type", value: uniqueTypes }));
    }

    if (abilityParam) {
      const uniqueAbilities = [...new Set(abilityParam.split(","))].join(",");
      dispatch(setFilterFromUrl({ key: "ability", value: uniqueAbilities }));
    }
  }, []);

  // Sync filters back to URL whenever they change
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
}
