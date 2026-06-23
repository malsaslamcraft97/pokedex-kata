import { initialFilters } from "../types";
import reducer, { setSearchText, setFilters, resetFilters } from "./uiSlice";

describe("pokemonUISlice", () => {
  it("should return initial state", () => {
    const state = reducer(undefined, { type: "unknown" });

    expect(state.searchText).toBe("");
    expect(state.filters.sortBy).toBe("");
    expect(state.filters.type).toBe("");
    expect(state.filters.ability).toBe("");
    expect(state.filters.height).toBe("");
  });

  it("should update search text", () => {
    const state = reducer(undefined, setSearchText("pikachu"));

    expect(state.searchText).toBe("pikachu");
  });

  it("should update specific filter - single select", () => {
    const state = reducer(
      undefined,
      setFilters({ key: "type", value: "fire" })
    );

    expect(state.filters.type).toBe("fire");
  });

  it("should update specific filter - multi select", () => {
    const first = reducer(
      undefined,
      setFilters({ key: "type", value: "fire" })
    );

    const second = reducer(first, setFilters({ key: "type", value: "water" }));

    expect(second.filters.type).toBe("fire,water");
  });

  it("should toggle multi-select if same option was selected", () => {
    const first = reducer(
      undefined,
      setFilters({ key: "type", value: "fire" })
    );

    const second = reducer(first, setFilters({ key: "type", value: "fire" }));

    expect(second.filters.type).toBe("");
  });

  it("should remove only the selected value from multi-select", () => {
    const state = {
      searchText: "",
      pageOffset: 0,
      filters: {
        type: "fire,water",
        ability: "",
        sortBy: "",
        height: "",
      },
      savedFilters: initialFilters,
    };

    const next = reducer(state, setFilters({ key: "type", value: "fire" }));

    expect(next.filters.type).toBe("water");
  });

  it("should overwrite single select filters", () => {
    const first = reducer(
      undefined,
      setFilters({ key: "sortBy", value: "height" })
    );

    const second = reducer(
      first,
      setFilters({ key: "sortBy", value: "weight" })
    );

    expect(second.filters.sortBy).toBe("weight");
  });

  it("should support multi-select for ability filter", () => {
    const first = reducer(
      undefined,
      setFilters({ key: "ability", value: "overgrow" })
    );

    const second = reducer(
      first,
      setFilters({ key: "ability", value: "blaze" })
    );

    expect(second.filters.ability).toBe("overgrow,blaze");
  });

  it("should reset filters", () => {
    const populatedState = reducer(
      undefined,
      setFilters({ key: "type", value: "fire" })
    );

    const resetState = reducer(populatedState, resetFilters());

    expect(resetState.filters.type).toBe("");
  });

  it("should handle page offset", () => {
    const state = reducer(undefined, {
      type: "pokemonUI/setPageOffset",
      payload: 10,
    });

    expect(state.pageOffset).toBe(10);
  });

  it("should handle save filters", () => {
    const state = reducer(undefined, {
      type: "pokemonUI/saveFilters",
    });

    expect(state.savedFilters).toEqual(initialFilters);
  });
});
