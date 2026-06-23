import { configureStore } from "@reduxjs/toolkit";
import { pokemonApi } from "./pokemonApi";
import { setupServer } from "msw/node";
import { http } from "msw";

const server = setupServer(
  http.get("https://pokeapi.co/api/v2/pokemon", () => {
    return new Response(
      JSON.stringify({
        results: [{ name: "bulbasaur" }, { name: "charmander" }],
      }),
      { status: 200 }
    );
  }),
  http.get("https://pokeapi.co/api/v2/pokemon/:name", ({ params }) => {
    if (params.name === "bulbasaur") {
      return Response.json({
        id: 1,
        name: "bulbasaur",
        types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
        sprites: {
          other: {
            "official-artwork": {
              front_default: "bulbasaur.png",
            },
          },
        },
      });
    }

    return Response.json({
      id: 4,
      name: "charmander",
      types: [{ type: { name: "fire" } }],
      sprites: {
        other: {
          "official-artwork": {
            front_default: "charmander.png",
          },
        },
      },
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("pokemonApi", () => {
  it("should fetch pokemon list successfully", async () => {
    const store = configureStore({
      reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
    });

    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemon.initiate(undefined)
    );

    expect(result.data?.results.length).toBe(2);
  });

  it("should fetch pokemon details successfully", async () => {
    const store = configureStore({
      reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
    });

    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemonDetails.initiate("bulbasaur")
    );

    expect(result.data?.name).toBe("bulbasaur");
  });

  it("should return enriched pokemon list with formatted id and types", async () => {
    const store = configureStore({
      reducer: {
        [pokemonApi.reducerPath]: pokemonApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(pokemonApi.middleware),
    });

    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemonListWithDetails.initiate({ offset: 0 })
    );

    expect(result.data).toBeDefined();
    expect(result.data?.length).toBe(2);

    const first = result.data?.[0];

    expect(first?.id).toBe(1);
    expect(first?.formattedId).toBe("N°001");
    expect(first?.name).toBe("Bulbasaur");
    expect(first?.types).toEqual(["Grass", "Poison"]);
    expect(first?.image).toBeDefined();
  });
});
