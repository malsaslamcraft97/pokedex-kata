import { describe, it, expect } from "vitest";
import { sortByHeight, sortById, sortByName, applySort } from "./pokemonSorters";
import { EnrichedPokemon } from "./pokemonTransformers";

const pikachu: EnrichedPokemon = {
  id: 25,
  formattedId: "N°025",
  name: "Pikachu",
  image: "",
  types: ["Electric"],
  height: 4,
};

const snorlax: EnrichedPokemon = {
  id: 143,
  formattedId: "N°143",
  name: "Snorlax",
  image: "",
  types: ["Normal"],
  height: 21,
};

const abra: EnrichedPokemon = {
  id: 63,
  formattedId: "N°063",
  name: "Abra",
  image: "",
  types: ["Psychic"],
  height: 9,
};

const list = [snorlax, pikachu, abra];

describe("sortByHeight", () => {
  it("sorts list from shortest to tallest in ascending direction", () => {
    const result = sortByHeight(list, "asc");

    expect(result.map((p) => p.name)).toEqual(["Pikachu", "Abra", "Snorlax"]);
  });

  it("sorts list from tallest to shortest in descending direction", () => {
    const result = sortByHeight(list, "desc");

    expect(result.map((p) => p.name)).toEqual(["Snorlax", "Abra", "Pikachu"]);
  });

  it("treats undefined height as 0 when sorting", () => {
    const noHeight: EnrichedPokemon = {
      id: 1,
      formattedId: "N°001",
      name: "Unknown",
      image: "",
      types: [],
    };

    const result = sortByHeight([pikachu, noHeight], "asc");

    expect(result[0].name).toBe("Unknown");
  });

  it("does not mutate the original list", () => {
    const original = [...list];

    sortByHeight(list, "asc");

    expect(list).toEqual(original);
  });
});

describe("sortById", () => {
  it("sorts list by id from lowest to highest in ascending direction", () => {
    const result = sortById(list, "asc");

    expect(result.map((p) => p.id)).toEqual([25, 63, 143]);
  });

  it("sorts list by id from highest to lowest in descending direction", () => {
    const result = sortById(list, "desc");

    expect(result.map((p) => p.id)).toEqual([143, 63, 25]);
  });
});

describe("sortByName", () => {
  it("sorts list alphabetically A to Z in ascending direction", () => {
    const result = sortByName(list, "asc");

    expect(result.map((p) => p.name)).toEqual(["Abra", "Pikachu", "Snorlax"]);
  });

  it("sorts list alphabetically Z to A in descending direction", () => {
    const result = sortByName(list, "desc");

    expect(result.map((p) => p.name)).toEqual(["Snorlax", "Pikachu", "Abra"]);
  });
});

describe("applySort", () => {
  it("sorts by id ascending when sortBy is id_asc", () => {
    const result = applySort(list, "id_asc", "");

    expect(result.map((p) => p.id)).toEqual([25, 63, 143]);
  });

  it("sorts by id descending when sortBy is id_desc", () => {
    const result = applySort(list, "id_desc", "");

    expect(result.map((p) => p.id)).toEqual([143, 63, 25]);
  });

  it("sorts by name ascending when sortBy is name_asc", () => {
    const result = applySort(list, "name_asc", "");

    expect(result.map((p) => p.name)).toEqual(["Abra", "Pikachu", "Snorlax"]);
  });

  it("sorts by name descending when sortBy is name_desc", () => {
    const result = applySort(list, "name_desc", "");

    expect(result.map((p) => p.name)).toEqual(["Snorlax", "Pikachu", "Abra"]);
  });

  it("sorts by height ascending when height is height_asc", () => {
    const result = applySort(list, "", "height_asc");

    expect(result.map((p) => p.name)).toEqual(["Pikachu", "Abra", "Snorlax"]);
  });

  it("sorts by height descending when height is height_desc", () => {
    const result = applySort(list, "", "height_desc");

    expect(result.map((p) => p.name)).toEqual(["Snorlax", "Abra", "Pikachu"]);
  });

  it("returns list in its original order when sortBy and height are both empty", () => {
    const result = applySort(list, "", "");

    expect(result.map((p) => p.name)).toEqual(["Snorlax", "Pikachu", "Abra"]);
  });

  it("does not mutate the original list", () => {
    const original = [...list];

    applySort(list, "id_asc", "");

    expect(list).toEqual(original);
  });
});
