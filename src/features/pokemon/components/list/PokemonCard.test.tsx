import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import { EnrichedPokemon } from "../../api/pokemonApi";

const mockPokemon: EnrichedPokemon = {
  id: 1,
  formattedId: "N°001",
  name: "Bulbasaur",
  image: "https://example.com/bulbasaur.png",
  types: ["Grass", "Poison"],
  ability: "Overgrow",
  height: 7,
};

describe("PokemonCard - rendering", () => {
  it("renders the formatted pokemon id", () => {
    // Arrange
    render(
      <MemoryRouter>
        <PokemonCard {...mockPokemon} />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("N°001")).toBeInTheDocument();
  });

  it("renders the pokemon name", () => {
    // Arrange
    render(
      <MemoryRouter>
        <PokemonCard {...mockPokemon} />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
  });

  it("renders the pokemon image with correct alt text", () => {
    // Arrange
    render(
      <MemoryRouter>
        <PokemonCard {...mockPokemon} />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByAltText("Bulbasaur")).toHaveAttribute(
      "src",
      "https://example.com/bulbasaur.png"
    );
  });

  it("renders a badge for each pokemon type", () => {
    // Arrange
    render(
      <MemoryRouter>
        <PokemonCard {...mockPokemon} />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("Grass")).toBeInTheDocument();
    expect(screen.getByText("Poison")).toBeInTheDocument();
  });

  it("renders the ability when provided", () => {
    // Arrange
    render(
      <MemoryRouter>
        <PokemonCard {...mockPokemon} />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("Overgrow")).toBeInTheDocument();
  });

  it("shows Unknown when ability is not provided", () => {
    // Arrange
    const pokemonWithoutAbility = { ...mockPokemon, ability: undefined };
    render(
      <MemoryRouter>
        <PokemonCard {...pokemonWithoutAbility} />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });

  it("renders height converted from decimetres to metres", () => {
    // Arrange - height: 7 (PokeAPI decimetres) = 0.7 m
    render(
      <MemoryRouter>
        <PokemonCard {...mockPokemon} />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("0.7 m")).toBeInTheDocument();
  });

  it("shows Unknown when height is not provided", () => {
    // Arrange
    const pokemonWithoutHeight = { ...mockPokemon, height: undefined };
    render(
      <MemoryRouter>
        <PokemonCard {...pokemonWithoutHeight} />
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });
});

describe("PokemonCard - interaction", () => {
  it("navigates to the pokemon detail page when card is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<PokemonCard {...mockPokemon} />} />
          <Route path="/pokemon/:name" element={<div>Detail Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Act
    await user.click(screen.getByText("Bulbasaur"));

    // Assert
    expect(screen.getByText("Detail Page")).toBeInTheDocument();
  });
});
