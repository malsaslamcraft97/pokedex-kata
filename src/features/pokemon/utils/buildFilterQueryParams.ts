export default function buildFilterQueryParams(filters: {
  search: string;
  type: string;
  abilities: string;
}) {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.type) {
    params.set("type", filters.type);
  }

  if (filters.abilities) {
    params.set("abilities", filters.abilities);
  }

  return params;
}
