import { render, screen } from "@testing-library/react";
import PokemonHero from "./PokemonHero";
import { PokemonDetails } from "../../../types/pokemonDetails";

const mockPokemon: PokemonDetails = {
  id: 1,
  name: "bulbasaur",
  height: 7,
  weight: 69,
  types: [
    { slot: 1, type: { name: "grass" } },
    { slot: 2, type: { name: "poison" } },
  ],
  abilities: [
    { ability: { name: "overgrow" }, is_hidden: false },
    { ability: { name: "chlorophyll" }, is_hidden: true },
  ],
  stats: [
    { base_stat: 45, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } },
  ],
  sprites: {
    other: {
      "official-artwork": {
        front_default: "https://example.com/bulbasaur.png",
      },
    },
  },
};

describe("PokemonHero - rendering", () => {
  it("renders the pokemon name", () => {
    // Arrange
    render(<PokemonHero pokemon={mockPokemon} />);

    // Assert
    expect(
      screen.getByRole("heading", { name: /bulbasaur/i })
    ).toBeInTheDocument();
  });

  it("renders the formatted pokemon id", () => {
    // Arrange
    render(<PokemonHero pokemon={mockPokemon} />);

    // Assert
    expect(screen.getByText("#001")).toBeInTheDocument();
  });

  it("renders a badge for each pokemon type", () => {
    // Arrange
    render(<PokemonHero pokemon={mockPokemon} />);

    // Assert
    expect(screen.getByText("grass")).toBeInTheDocument();
    expect(screen.getByText("poison")).toBeInTheDocument();
  });

  it("renders the visible ability", () => {
    // Arrange
    render(<PokemonHero pokemon={mockPokemon} />);

    // Assert
    expect(screen.getByText("overgrow")).toBeInTheDocument();
  });

  it("renders height converted from decimetres to metres", () => {
    // Arrange - height: 7 (PokeAPI decimetres) = 0.7 m
    render(<PokemonHero pokemon={mockPokemon} />);

    // Assert
    expect(screen.getByText("0.7 m")).toBeInTheDocument();
  });

  it("renders the official artwork image", () => {
    // Arrange
    render(<PokemonHero pokemon={mockPokemon} />);

    // Assert
    expect(screen.getByAltText("bulbasaur")).toBeInTheDocument();
  });
});

describe("PokemonHero - hidden ability", () => {
  it("renders the hidden ability section when pokemon has a hidden ability", () => {
    // Arrange
    render(<PokemonHero pokemon={mockPokemon} />);

    // Assert
    expect(screen.getByText(/hidden ability/i)).toBeInTheDocument();
    expect(screen.getByText("chlorophyll")).toBeInTheDocument();
  });

  it("renders weight when hidden abilities are present", () => {
    // Arrange - weight: 69 (PokeAPI hectograms) = 6.9 kg
    render(<PokemonHero pokemon={mockPokemon} />);

    // Assert
    expect(screen.getByText("6.9 kg")).toBeInTheDocument();
  });

  it("does not render the hidden ability section when no hidden abilities exist", () => {
    // Arrange
    const pokemonWithNoHiddenAbility: PokemonDetails = {
      ...mockPokemon,
      abilities: [{ ability: { name: "overgrow" }, is_hidden: false }],
    };
    render(<PokemonHero pokemon={pokemonWithNoHiddenAbility} />);

    // Assert
    expect(screen.queryByText(/hidden ability/i)).not.toBeInTheDocument();
  });
});

describe("PokemonHero - image", () => {
  it("does not render the image when official artwork is unavailable", () => {
    // Arrange
    const pokemonWithoutImage: PokemonDetails = {
      ...mockPokemon,
      sprites: {
        other: { "official-artwork": { front_default: undefined } },
      },
    };
    render(<PokemonHero pokemon={pokemonWithoutImage} />);

    // Assert
    expect(screen.queryByAltText("bulbasaur")).not.toBeInTheDocument();
  });
});
