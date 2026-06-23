import { initialFilters } from "@/features/pokemon/types";
import { createTransform } from "redux-persist";

const initialState = {
  searchText: "",
  filters: initialFilters,
  pageOffset: 0,
  savedFilters: initialFilters,
};

export const pokemonUITransform = createTransform(
  (inboundState: any) => ({
    savedFilters: inboundState.savedFilters,
  }),

  (outboundState: any) => ({
    ...initialState,
    savedFilters: outboundState.savedFilters,
  }),

  { whitelist: ["pokemonUI"] }
);
