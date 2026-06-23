import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer, {
  setLoading,
  setPokemon,
  setError,
} from "./pokemonSlice";

describe("pokemon slice", () => {
  it("should return the initial state", () => {
    const store = configureStore({
      reducer: {
        pokemon: pokemonReducer,
      },
    });

    const state = store.getState().pokemon;

    expect(state).toEqual({
      items: [],
      loading: false,
      error: null,
    });
  });
  it("should return the initial state", () => {
    const store = configureStore({
      reducer: {
        pokemon: pokemonReducer,
      },
    });

    const state = store.getState().pokemon;

    expect(state).toEqual({
      items: [],
      loading: false,
      error: null,
    });
  });

  it("should set loading to true when setLoading is dispatched", () => {
    const store = configureStore({
      reducer: {
        pokemon: pokemonReducer,
      },
    });

    store.dispatch(setLoading(true));

    const state = store.getState().pokemon;

    expect(state.loading).toBe(true);
  });

  it("should set pokemon items when setPokemon is dispatched", () => {
    const store = configureStore({
      reducer: {
        pokemon: pokemonReducer,
      },
    });

    const mockPokemon = [{ name: "bulbasaur" }, { name: "charmander" }];

    store.dispatch(setPokemon(mockPokemon));

    const state = store.getState().pokemon;

    expect(state.items).toEqual(mockPokemon);
  });

  it("should set error message when setError is dispatched", () => {
    const store = configureStore({
      reducer: {
        pokemon: pokemonReducer,
      },
    });

    store.dispatch(setError("Failed to fetch"));

    const state = store.getState().pokemon;

    expect(state.error).toBe("Failed to fetch");
  });
});
