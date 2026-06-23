import { useState } from "react";
import styles from "./ActionToolbar.module.scss";
import Select from "./Select";
import { ArrowUpDown, BookType, Ruler, Sparkles } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { resetFilters, setFilters, setSavedFilters } from "../../store/uiSlice";
import { FilterKey, SelectOption } from "../../types/filters";

const filterOptions: Record<FilterKey, SelectOption[]> = {
  sortBy: [
    { label: "ID (Ascending)", value: "id_asc" },
    { label: "ID (Descending)", value: "id_desc" },
    { label: "Name (A–Z)", value: "name_asc" },
    { label: "Name (Z–A)", value: "name_desc" },
  ],
  type: [
    { label: "Normal", value: "normal" },
    { label: "Fire", value: "fire" },
    { label: "Water", value: "water" },
    { label: "Electric", value: "electric" },
    { label: "Grass", value: "grass" },
    { label: "Ice", value: "ice" },
    { label: "Fighting", value: "fighting" },
    { label: "Poison", value: "poison" },
    { label: "Ground", value: "ground" },
    { label: "Flying", value: "flying" },
    { label: "Psychic", value: "psychic" },
    { label: "Bug", value: "bug" },
    { label: "Rock", value: "rock" },
    { label: "Ghost", value: "ghost" },
    { label: "Dragon", value: "dragon" },
    { label: "Dark", value: "dark" },
    { label: "Steel", value: "steel" },
    { label: "Fairy", value: "fairy" },
  ],
  ability: [
    { label: "Overgrow", value: "overgrow" },
    { label: "Blaze", value: "blaze" },
    { label: "Torrent", value: "torrent" },
    { label: "Shield Dust", value: "shield-dust" },
    { label: "Intimidate", value: "intimidate" },
    { label: "Static", value: "static" },
    { label: "Levitate", value: "levitate" },
    { label: "Chlorophyll", value: "chlorophyll" },
    { label: "Swift Swim", value: "swift-swim" },
    { label: "Pressure", value: "pressure" },
  ],
  height: [
    { label: "Shortest First", value: "height_asc" },
    { label: "Tallest First", value: "height_desc" },
  ],
};

export default function ActionToolbar() {
  const dispatch = useAppDispatch();

  const [openSelect, setOpenSelect] = useState<FilterKey | null>(null);

  const filters = useAppSelector((state) => state.pokemonUI.filters);
  const savedFilters = useAppSelector((state) => state.pokemonUI.savedFilters);

  const toggle = (key: FilterKey) => {
    setOpenSelect(openSelect === key ? null : key);
  };

  const handleSelect = (key: FilterKey, value: string) => {
    dispatch(setFilters({ key, value }));
    setOpenSelect(null);
  };

  const onClose = () => {
    setOpenSelect(null);
  };

  return (
    <div className={styles.toolbar}>
      {/* SORT */}
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Sort By:</span>
        <Select
          variant="default"
          icon={<ArrowUpDown size={18} />}
          label="Ascending"
          options={filterOptions.sortBy}
          selectedValue={filters.sortBy}
          isOpen={openSelect === "sortBy"}
          onToggle={() => toggle("sortBy")}
          onSelectOption={(value) => handleSelect("sortBy", value)}
          onClose={onClose}
        />
      </div>

      {/* TYPE */}
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Type:</span>
        <Select
          variant="type"
          multiSelect
          icon={<BookType size={18} />}
          label="All Types"
          options={filterOptions.type}
          selectedValue={filters.type}
          isOpen={openSelect === "type"}
          onToggle={() => toggle("type")}
          onSelectOption={(value) => handleSelect("type", value)}
          onClose={onClose}
        />
      </div>

      {/* ABILITY */}
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Ability:</span>
        <Select
          variant="ability"
          multiSelect
          icon={<Sparkles size={18} />}
          label="All Abilities"
          options={filterOptions.ability}
          selectedValue={filters.ability}
          isOpen={openSelect === "ability"}
          onToggle={() => toggle("ability")}
          onSelectOption={(value) => handleSelect("ability", value)}
          onClose={onClose}
        />
      </div>

      {/* HEIGHT */}
      <div className={styles.filterGroup}>
        <span className={styles.filterLabel}>Height:</span>
        <Select
          variant="default"
          icon={<Ruler size={18} />}
          label="All Heights"
          options={filterOptions.height}
          selectedValue={filters.height}
          isOpen={openSelect === "height"}
          onToggle={() => toggle("height")}
          onSelectOption={(value) => handleSelect("height", value)}
          onClose={onClose}
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className={[styles.filterGroup, styles.actionBtns].join(" ")}>
        <button
          className={styles.resetBtn}
          onClick={() => dispatch(resetFilters())}
        >
          Reset
        </button>
        <button
          className={styles.clearBtn}
          onClick={() => dispatch(setSavedFilters())}
        >
          Save Filters
        </button>
      </div>

      {/* Saved Filters */}
      {savedFilters.type.length > 0 && (
        <div className={styles.savedFiltersGroup}>
          <span className={styles.filterLabel}>Saved Filters:</span>
          <div className={styles.savedFilters}>
            {savedFilters.type.split(",").map((t) => (
              <span
                key={t}
                className={`${styles.badge} ${styles[t]}`}
                // onClick={() => handleSelect("type", t)}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
