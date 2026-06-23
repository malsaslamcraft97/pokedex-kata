import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import pokemonReducer from "../features/pokemon/store/pokemonSlice";
import pokemonUIReducer from "../features/pokemon/store/uiSlice";
import { pokemonApi } from "../features/pokemon/api/pokemonApi";

/*
Persist config for pokemonUI slice
We blacklist fields we DO NOT want persisted.
So only savedFilters will remain.
*/
const pokemonUIPersistConfig = {
  key: "pokemonUI",
  storage,
  blacklist: ["searchText", "filters", "pageOffset"],
};

const persistedPokemonUIReducer = persistReducer(
  pokemonUIPersistConfig,
  pokemonUIReducer
);

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    pokemonUI: persistedPokemonUIReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(pokemonApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
