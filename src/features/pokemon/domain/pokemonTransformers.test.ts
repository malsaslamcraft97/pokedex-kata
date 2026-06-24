import { describe, it, expect } from "vitest";
import { enrichPokemon, RawPokemonDetail } from "./pokemonTransformers";

const baseDetail: RawPokemonDetail = {
  id: 1,
  name: "bulbasaur",
  height: 7,
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
  abilities: [{ ability: { name: "overgrow" }, is_hidden: false }],
  sprites: {
    other: {
      home: { front_default: "home.png" },
      "official-artwork": { front_default: "artwork.png" },
    },
  },
};

describe("enrichPokemon - id formatting", () => {
  it("formats id 1 as N°001 padded to 3 digits", () => {
    const result = enrichPokemon(baseDetail);

    expect(result.formattedId).toBe("N°001");
  });

  it("formats id 100 as N°100 without extra padding", () => {
    const result = enrichPokemon({ ...baseDetail, id: 100 });

    expect(result.formattedId).toBe("N°100");
  });
});

describe("enrichPokemon - name", () => {
  it("capitalizes the first letter of a lowercase name", () => {
    const result = enrichPokemon(baseDetail);

    expect(result.name).toBe("Bulbasaur");
  });
});

describe("enrichPokemon - image", () => {
  it("uses the home sprite when it is available", () => {
    const result = enrichPokemon(baseDetail);

    expect(result.image).toBe("home.png");
  });

  it("falls back to official-artwork when home sprite is null", () => {
    const detail: RawPokemonDetail = {
      ...baseDetail,
      sprites: {
        other: {
          home: { front_default: null },
          "official-artwork": { front_default: "artwork.png" },
        },
      },
    };

    const result = enrichPokemon(detail);

    expect(result.image).toBe("artwork.png");
  });

  it("returns empty string when both home and official-artwork sprites are null", () => {
    const detail: RawPokemonDetail = {
      ...baseDetail,
      sprites: {
        other: {
          home: { front_default: null },
          "official-artwork": { front_default: null },
        },
      },
    };

    const result = enrichPokemon(detail);

    expect(result.image).toBe("");
  });
});

describe("enrichPokemon - ability", () => {
  it("converts a hyphenated ability name to title-case with a space", () => {
    const detail: RawPokemonDetail = {
      ...baseDetail,
      abilities: [{ ability: { name: "solar-power" }, is_hidden: false }],
    };

    const result = enrichPokemon(detail);

    expect(result.ability).toBe("Solar Power");
  });

  it("returns undefined when the abilities array is empty", () => {
    const detail: RawPokemonDetail = { ...baseDetail, abilities: [] };

    const result = enrichPokemon(detail);

    expect(result.ability).toBeUndefined();
  });
});

describe("enrichPokemon - types", () => {
  it("capitalizes the first letter of each type", () => {
    const result = enrichPokemon(baseDetail);

    expect(result.types).toEqual(["Grass", "Poison"]);
  });
});

describe("enrichPokemon - height", () => {
  it("passes the raw height value through unchanged", () => {
    const result = enrichPokemon(baseDetail);

    expect(result.height).toBe(7);
  });
});
