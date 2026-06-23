import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { store } from "../../../app/store";
import { setupServer } from "msw/node";
import { http } from "msw";
import PokemonListPage from "./PokemonListPage";

const server = setupServer(
  http.get("https://pokeapi.co/api/v2/pokemon", () => {
    return new Response(
      JSON.stringify({
        results: [{ name: "bulbasaur" }],
      }),
      { status: 200 }
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Pokemon navigation", () => {
  it("navigates to detail page when pokemon is clicked", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<PokemonListPage />} />
            <Route
              path="/pokemon/:name"
              element={<div>Pokemon Details Page</div>}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() =>
      expect(screen.getByText("Bulbasaur")).toBeInTheDocument()
    );

    const user = userEvent.setup();
    await user.click(screen.getByText("Bulbasaur"));

    await waitFor(() =>
      expect(screen.getByText("Pokemon Details Page")).toBeInTheDocument()
    );
  });
});
