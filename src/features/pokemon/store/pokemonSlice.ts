import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Pokemon = {
  name: string;
};

export type PokemonState = {
  items: Pokemon[];
  loading: boolean;
  error: string | null;
};

const initialState: PokemonState = {
  items: [],
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setPokemon(state, action: PayloadAction<Pokemon[]>) {
      state.items = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setPokemon, setError } = pokemonSlice.actions;
export default pokemonSlice.reducer;
