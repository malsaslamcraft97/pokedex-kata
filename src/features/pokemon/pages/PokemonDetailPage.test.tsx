import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { setupServer } from "msw/node";
import { http } from "msw";
import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "../store/pokemonSlice";
import { pokemonApi } from "../api/pokemonApi";
import PokemonDetailPage from "./PokemonDetailPage";
import userEvent from "@testing-library/user-event";

const server = setupServer(
  // Pokemon details
  http.get("https://pokeapi.co/api/v2/pokemon/:name", ({ params }) => {
    return new Response(
      JSON.stringify({
        id: 1,
        name: params.name,
        height: 7,
        weight: 69,
        types: [{ slot: 1, type: { name: "grass" } }],
        abilities: [
          {
            ability: { name: "overgrow" },
            is_hidden: false,
          },
        ],
        stats: [
          {
            base_stat: 45,
            stat: { name: "hp" },
          },
          {
            base_stat: 49,
            stat: { name: "attack" },
          },
        ],
        sprites: {
          other: {
            "official-artwork": {
              front_default: "test.png",
            },
          },
        },
      }),
      { status: 200 }
    );
  }),

  // Pokemon species (new dependency)
  http.get("https://pokeapi.co/api/v2/pokemon-species/:name", () => {
    return new Response(
      JSON.stringify({
        flavor_text_entries: [],
      }),
      { status: 200 }
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function createTestStore() {
  return configureStore({
    reducer: {
      pokemon: pokemonReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (gDM) => gDM().concat(pokemonApi.middleware),
  });
}

describe("PokemonDetailPage", () => {
  it("shows error state when API fails", async () => {
    server.use(
      http.get("https://pokeapi.co/api/v2/pokemon/:name", () => {
        return new Response(null, { status: 500 });
      })
    );

    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
          <Routes>
            <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/error loading/i)).toBeInTheDocument();
  });

  // SUCCESS FLOW
  it("fetches and displays pokemon details", async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
          <Routes>
            <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    // Skeleton appears first
    expect(screen.getByTestId("detail-skeleton")).toBeInTheDocument();

    // Then actual content renders
    expect(
      await screen.findByRole("heading", { name: /bulbasaur/i })
    ).toBeInTheDocument();

    // Extra verification (robust test)
    expect(screen.getByText(/overgrow/i)).toBeInTheDocument();
  });

  it("shows retry button when request fails", async () => {
    server.use(
      http.get("https://pokeapi.co/api/v2/pokemon/:name", () => {
        return new Response(null, { status: 500 });
      })
    );

    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
          <Routes>
            <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/error loading/i)).toBeInTheDocument();

    // This will FAIL (because we don't have retry button)
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("navigates back when back button is clicked", async () => {
    const store = createTestStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={["/previous", "/pokemon/bulbasaur"]}
          initialIndex={1}
        >
          <Routes>
            <Route path="/previous" element={<div>Previous Page</div>} />
            <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await screen.findByRole("heading", { name: /bulbasaur/i });

    const backButton = screen.getByRole("button", { name: /go back/i });
    await user.click(backButton);

    expect(await screen.findByText("Previous Page")).toBeInTheDocument();
  });

  it("renders all tabs and switches between them", async () => {
    const store = createTestStore();
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
          <Routes>
            <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await screen.findByRole("heading", { name: /bulbasaur/i });

    expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /stats/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /evolution/i })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /stats/i }));

    expect(screen.getByText(/battle overview/i)).toBeInTheDocument();
    expect(screen.getByText(/highest stat/i)).toBeInTheDocument();
    expect(screen.getByText(/stat distribution/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /evolution/i }));

    expect(
      await screen.findByText("Evolution chain coming soon...")
    ).toBeInTheDocument();
  });

  it("passes species data to about tab", async () => {
    server.use(
      http.get("https://pokeapi.co/api/v2/pokemon-species/:name", () => {
        return new Response(
          JSON.stringify({
            flavor_text_entries: [
              {
                flavor_text: "A strange seed was planted on its back at birth.",
                language: { name: "en" },
              },
            ],
          }),
          { status: 200 }
        );
      })
    );

    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/pokemon/bulbasaur"]}>
          <Routes>
            <Route path="/pokemon/:name" element={<PokemonDetailPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await screen.findByRole("heading", { name: /bulbasaur/i });

    expect(screen.getByText(/strange seed/i)).toBeInTheDocument();
  });
});
