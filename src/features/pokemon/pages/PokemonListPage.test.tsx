import { expect, beforeAll, afterEach, afterAll } from "vitest";
import userEvent from "@testing-library/user-event";
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupServer } from "msw/node";
import { http } from "msw";
import PokemonListPage from "./PokemonListPage";
import { configureStore } from "@reduxjs/toolkit";
import pokemonUIReducer from "../store/uiSlice";
import { pokemonApi } from "../api/pokemonApi";
import { MemoryRouter } from "react-router-dom";

function createTestStore() {
  return configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      pokemonUI: pokemonUIReducer,
    },
    middleware: (gDM) => gDM().concat(pokemonApi.middleware),
  });
}

let intersectionCallback: IntersectionObserverCallback;

class IntersectionObserverMock {
  constructor(cb: IntersectionObserverCallback) {
    intersectionCallback = cb;
  }

  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: IntersectionObserverMock,
});

const server = setupServer(
  // 1️⃣ List endpoint
  http.get("https://pokeapi.co/api/v2/pokemon", () => {
    return Response.json({
      results: [{ name: "bulbasaur" }, { name: "charmander" }],
    });
  }),

  // 2️⃣ Details endpoint - Bulbasaur
  http.get("https://pokeapi.co/api/v2/pokemon/bulbasaur", () => {
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
  }),

  // 3️⃣ Details endpoint - Charmander
  http.get("https://pokeapi.co/api/v2/pokemon/charmander", () => {
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

describe("PokemonListPage - enriched list", () => {
  it("renders pokemon cards with id and real types", async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonListPage />
        </MemoryRouter>
      </Provider>
    );

    // Wait for enriched rendering

    // Capitalized name
    expect(await screen.findByText("Bulbasaur")).toBeInTheDocument();
    expect(await screen.findByText("Charmander")).toBeInTheDocument();

    // Padded ID
    expect(screen.getByText("N°001")).toBeInTheDocument();
    expect(screen.getByText("N°004")).toBeInTheDocument();

    // Real types
    expect(screen.getByText("Grass")).toBeInTheDocument();
    expect(screen.getByText("Poison")).toBeInTheDocument();
    expect(screen.getByText("Fire")).toBeInTheDocument();
  });

  it("filters pokemon based on the search input", async () => {
    const store = createTestStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonListPage />
        </MemoryRouter>
      </Provider>
    );

    await screen.findByText("Bulbasaur");

    const input = screen.getByRole("searchbox");

    await user.type(input, "Bul");

    expect(screen.getAllByText("Bulbasaur")).toHaveLength(1);
    expect(screen.queryByText("Charmander")).not.toBeInTheDocument();
  });

  it("shows empty state when no results match search", async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonListPage />
        </MemoryRouter>
      </Provider>
    );

    await screen.findByText("Bulbasaur");

    const input = screen.getByRole("searchbox");

    await user.type(input, "xyz");

    expect(screen.getByText(/No Pokémon Found/i)).toBeInTheDocument();
  });

  it("clicking suggestion updates search", async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonListPage />
        </MemoryRouter>
      </Provider>
    );

    await screen.findByText("Bulbasaur");

    const input = screen.getByRole("searchbox");

    await user.type(input, "zzz");

    const suggestion = screen.getByRole("button", { name: /bulbasaur/i });

    await user.click(suggestion);

    expect(input).toHaveValue("bulbasaur");
  });

  it("simulate observer to check pageOffset", async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonListPage />
        </MemoryRouter>
      </Provider>
    );

    // wait for initial fetch to finish as we do the scroll after initial data loads
    await screen.findByText("Bulbasaur");

    act(() => {
      intersectionCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(store.getState().pokemonUI.pageOffset).toBe(20);
  });

  it("check if user is able to save the filters", async () => {
    const store = createTestStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonListPage />
        </MemoryRouter>
      </Provider>
    );

    await screen.findByText("Bulbasaur");

    // open Type dropdown
    const typeDropdown = screen.getByText("All Types");
    await user.click(typeDropdown);

    // wait for Fire option
    const fireOption = await screen.findByRole("option", { name: /fire/i });
    await user.click(fireOption);

    // click Save Filters
    const saveButton = screen.getByRole("button", { name: /save/i });
    await user.click(saveButton);

    const { filters, savedFilters } = store.getState().pokemonUI;

    expect(filters.type).toBe("fire");
    expect(savedFilters.type).toBe("fire");
  });
});
