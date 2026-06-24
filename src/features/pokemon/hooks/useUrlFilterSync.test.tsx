import { describe, it, expect } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { useSearchParams } from "react-router-dom";
import pokemonUIReducer, { setFilters } from "../store/uiSlice";
import useUrlFilterSync from "./useUrlFilterSync";

function createTestStore() {
  return configureStore({
    reducer: { pokemonUI: pokemonUIReducer },
  });
}

function UrlParamsDisplay() {
  const [searchParams] = useSearchParams();
  return <output data-testid="url-params">{searchParams.toString()}</output>;
}

function TestComponent() {
  useUrlFilterSync();
  return <UrlParamsDisplay />;
}

function renderWithEnv(
  store: ReturnType<typeof createTestStore>,
  initialUrl = "/"
) {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialUrl]}>
        <TestComponent />
      </MemoryRouter>
    </Provider>
  );
}

describe("useUrlFilterSync - URL to Redux hydration on mount", () => {
  it("dispatches setSearchText when search param is present in the URL", () => {
    const store = createTestStore();

    renderWithEnv(store, "/?search=bulbasaur");

    expect(store.getState().pokemonUI.searchText).toBe("bulbasaur");
  });

  it("dispatches setFilterFromUrl for type when type param is present in the URL", () => {
    const store = createTestStore();

    renderWithEnv(store, "/?type=fire");

    expect(store.getState().pokemonUI.filters.type).toBe("fire");
  });

  it("dispatches setFilterFromUrl for ability when abilities param is present in the URL", () => {
    const store = createTestStore();

    renderWithEnv(store, "/?abilities=overgrow");

    expect(store.getState().pokemonUI.filters.ability).toBe("overgrow");
  });

  it("deduplicates repeated values in the type param before dispatching", () => {
    const store = createTestStore();

    renderWithEnv(store, "/?type=fire,fire,water");

    expect(store.getState().pokemonUI.filters.type).toBe("fire,water");
  });
});

describe("useUrlFilterSync - Redux to URL sync on filter change", () => {
  it("updates the URL type param when the type filter changes after mount", () => {
    const store = createTestStore();
    renderWithEnv(store, "/");

    act(() => {
      store.dispatch(setFilters({ key: "type", value: "fire" }));
    });

    expect(screen.getByTestId("url-params")).toHaveTextContent("type=fire");
  });

  it("updates the URL search param when searchText changes after mount", () => {
    const store = createTestStore();
    renderWithEnv(store, "/");

    act(() => {
      store.dispatch({ type: "pokemonUI/setSearchText", payload: "char" });
    });

    expect(screen.getByTestId("url-params")).toHaveTextContent("search=char");
  });

  it("does not add any params to the URL on initial mount with no filters active", () => {
    const store = createTestStore();
    renderWithEnv(store, "/");

    expect(screen.getByTestId("url-params").textContent).toBe("");
  });
});
