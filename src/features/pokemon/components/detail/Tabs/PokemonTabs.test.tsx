import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PokemonTabs from "./PokemonTabs";
import { PokemonDetails } from "../../../types/pokemonDetails";
import { PokemonSpecies } from "../../../types/pokemonSpecies";

const mockPokemon: PokemonDetails = {
  id: 1,
  name: "bulbasaur",
  height: 7,
  weight: 69,
  types: [{ slot: 1, type: { name: "grass" } }],
  abilities: [{ ability: { name: "overgrow" }, is_hidden: false }],
  stats: [
    { base_stat: 45, stat: { name: "hp" } },
    { base_stat: 49, stat: { name: "attack" } },
    { base_stat: 49, stat: { name: "defense" } },
    { base_stat: 65, stat: { name: "special-attack" } },
    { base_stat: 65, stat: { name: "special-defense" } },
    { base_stat: 45, stat: { name: "speed" } },
  ],
  sprites: {
    other: {
      "official-artwork": {
        front_default: "https://example.com/bulbasaur.png",
      },
    },
  },
};

const mockSpecies: PokemonSpecies = {
  id: 1,
  order: 1,
  name: "bulbasaur",
  gender_rate: 1,
  egg_groups: [{ name: "monster" }],
  hatch_counter: 20,
  flavor_text_entries: [
    {
      flavor_text: "A strange seed was planted on its back at birth.",
      language: { name: "en" },
    },
  ],
};

describe("PokemonTabs - rendering", () => {
  it("renders all three navigation tabs", () => {
    // Arrange
    render(<PokemonTabs pokemon={mockPokemon} species={mockSpecies} />);

    // Assert
    expect(
      screen.getByRole("button", { name: /about/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /stats/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /evolution/i })
    ).toBeInTheDocument();
  });

  it("shows the About tab content by default", () => {
    // Arrange
    render(<PokemonTabs pokemon={mockPokemon} species={mockSpecies} />);

    // Assert
    expect(screen.getByText(/strange seed/i)).toBeInTheDocument();
  });
});

describe("PokemonTabs - tab switching", () => {
  it("shows Stats tab content when the stats tab is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<PokemonTabs pokemon={mockPokemon} species={mockSpecies} />);

    // Act
    await user.click(screen.getByRole("button", { name: /stats/i }));

    // Assert
    expect(screen.getByText(/battle overview/i)).toBeInTheDocument();
    expect(screen.getByText(/highest stat/i)).toBeInTheDocument();
    expect(screen.getByText(/stat distribution/i)).toBeInTheDocument();
  });

  it("shows Evolution tab content when the evolution tab is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<PokemonTabs pokemon={mockPokemon} species={mockSpecies} />);

    // Act
    await user.click(screen.getByRole("button", { name: /evolution/i }));

    // Assert
    expect(
      screen.getByText(/evolution chain coming soon/i)
    ).toBeInTheDocument();
  });

  it("switches back to About tab content when about tab is clicked after navigating away", async () => {
    // Arrange
    const user = userEvent.setup();
    render(<PokemonTabs pokemon={mockPokemon} species={mockSpecies} />);

    // Act
    await user.click(screen.getByRole("button", { name: /evolution/i }));
    await user.click(screen.getByRole("button", { name: /about/i }));

    // Assert
    expect(screen.getByText(/strange seed/i)).toBeInTheDocument();
  });
});
