export type FilterKey = "sortBy" | "type" | "ability" | "height";

export type Filters = {
  sortBy: string;
  type: string;
  ability: string;
  height: string;
};

export type SelectOption = {
  label: string;
  value: string;
};

export const initialFilters: Filters = {
  sortBy: "",
  type: "",
  ability: "",
  height: "",
};
