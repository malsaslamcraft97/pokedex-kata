import { render, screen } from "@testing-library/react";
import Select from "./Select";
import userEvent from "@testing-library/user-event";

describe("Select Component - rendering", () => {
  it("renders the label", () => {
    render(
      <Select
        label="All Types"
        options={[]}
        selectedValue=""
        isOpen={false}
        onToggle={vi.fn()}
        onSelectOption={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText("All Types")).toBeInTheDocument();
  });

  it("calls onToggle when clicked", async () => {
    const onToggle = vi.fn();

    render(
      <Select
        label="All Types"
        options={[]}
        selectedValue=""
        isOpen={false}
        onToggle={onToggle}
        onSelectOption={vi.fn()}
        onClose={vi.fn()}
      />
    );

    await userEvent.click(screen.getByText("All Types"));

    expect(onToggle).toHaveBeenCalled();
  });

  it("renders options when open - single select", () => {
    render(
      <Select
        label="All Types"
        options={[
          { label: "Fire", value: "fire" },
          { label: "Water", value: "water" },
        ]}
        selectedValue=""
        isOpen={true}
        onToggle={vi.fn()}
        onSelectOption={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText("Fire")).toBeInTheDocument();
    expect(screen.getByText("Water")).toBeInTheDocument();
  });

  it("calls onSelectOption when an option is clicked", async () => {
    const onSelectOption = vi.fn();

    render(
      <Select
        label="All Types"
        options={[{ label: "Fire", value: "fire" }]}
        selectedValue=""
        isOpen={true}
        onToggle={vi.fn()}
        onSelectOption={onSelectOption}
        onClose={vi.fn()}
      />
    );

    await userEvent.click(screen.getByText("Fire"));

    expect(onSelectOption).toHaveBeenCalledWith("fire");
  });

  it("highlights the selected option", () => {
    render(
      <Select
        label="All Types"
        options={[
          { label: "Fire", value: "fire" },
          { label: "Water", value: "water" },
        ]}
        selectedValue="fire"
        isOpen={true}
        onToggle={vi.fn()}
        onSelectOption={vi.fn()}
        onClose={vi.fn()}
      />
    );

    const selectedOption = screen.getByRole("option", { selected: true });
    expect(selectedOption).toHaveTextContent("Fire");
  });

  it("calls onClose when clicking outside", async () => {
    const onClose = vi.fn();

    render(
      <div>
        <Select
          label="All Types"
          options={[{ label: "Fire", value: "fire" }]}
          selectedValue=""
          isOpen={true}
          onToggle={vi.fn()}
          onSelectOption={vi.fn()}
          onClose={onClose}
        />
        <button>Outside</button>
      </div>
    );

    await userEvent.click(screen.getByText("Outside"));

    expect(onClose).toHaveBeenCalled();
  });

  it("shows selected option label when value is selected", () => {
    render(
      <Select
        label="All Types"
        options={[{ label: "Fire", value: "fire" }]}
        selectedValue="fire"
        isOpen={false}
        onToggle={vi.fn()}
        onSelectOption={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText("Fire")).toBeInTheDocument();
  });

  it("check if we can select multiple filters for type", () => {
    render(
      <Select
        multiSelect
        label="All Types"
        options={[
          { label: "Fire", value: "fire" },
          { label: "Grass", value: "grass" },
          { label: "Water", value: "water" },
        ]}
        selectedValue="fire,water"
        isOpen={false}
        onToggle={vi.fn()}
        onSelectOption={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText("2 selected")).toBeInTheDocument();
  });
});
