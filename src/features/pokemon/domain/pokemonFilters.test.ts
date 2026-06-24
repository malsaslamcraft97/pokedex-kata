import { describe, it, expect } from "vitest";
import { filterBySearch, filterByType, filterByAbility } from "./pokemonFilters";
import { EnrichedPokemon } from "./pokemonTransformers";

const bulbasaur: EnrichedPokemon = {
  id: 1,
  formattedId: "N°001",
  name: "Bulbasaur",
  image: "",
  types: ["Grass", "Poison"],
  ability: "Overgrow",
  height: 7,
};

const charmander: EnrichedPokemon = {
  id: 4,
  formattedId: "N°004",
  name: "Charmander",
  image: "",
  types: ["Fire"],
  ability: "Blaze",
  height: 6,
};

const snorlax: EnrichedPokemon = {
  id: 143,
  formattedId: "N°143",
  name: "Snorlax",
  image: "",
  types: ["Normal"],
  height: 21,
};

const list = [bulbasaur, charmander, snorlax];

describe("filterBySearch", () => {
  it("returns the full list when searchText is empty", () => {
    const result = filterBySearch(list, "");

    expect(result).toEqual(list);
  });

  it("returns only pokemon whose name contains the search substring", () => {
    const result = filterBySearch(list, "char");

    expect(result).toEqual([charmander]);
  });

  it("matches names case-insensitively", () => {
    const result = filterBySearch(list, "BULBA");

    expect(result).toEqual([bulbasaur]);
  });

  it("returns an empty array when no pokemon name matches", () => {
    const result = filterBySearch(list, "mewtwo");

    expect(result).toEqual([]);
  });
});

describe("filterByType", () => {
  it("returns the full list when selectedTypes is empty", () => {
    const result = filterByType(list, []);

    expect(result).toEqual(list);
  });

  it("returns only pokemon that have the selected type", () => {
    const result = filterByType(list, ["fire"]);

    expect(result).toEqual([charmander]);
  });

  it("returns pokemon matching any of the selected types", () => {
    const result = filterByType(list, ["fire", "grass"]);

    expect(result).toEqual([bulbasaur, charmander]);
  });

  it("matches pokemon types case-insensitively", () => {
    const result = filterByType(list, ["GRASS"]);

    expect(result).toEqual([bulbasaur]);
  });

  it("returns an empty array when no pokemon has the selected type", () => {
    const result = filterByType(list, ["water"]);

    expect(result).toEqual([]);
  });
});

describe("filterByAbility", () => {
  it("returns the full list when ability is empty", () => {
    const result = filterByAbility(list, "");

    expect(result).toEqual(list);
  });

  it("returns only pokemon with an exact ability match", () => {
    const result = filterByAbility(list, "Blaze");

    expect(result).toEqual([charmander]);
  });

  it("matches ability case-insensitively", () => {
    const result = filterByAbility(list, "overgrow");

    expect(result).toEqual([bulbasaur]);
  });

  it("returns an empty array when no pokemon has the ability", () => {
    const result = filterByAbility(list, "intimidate");

    expect(result).toEqual([]);
  });

  it("excludes pokemon that have no ability defined", () => {
    const result = filterByAbility(list, "Overgrow");

    expect(result).not.toContain(snorlax);
  });
});
