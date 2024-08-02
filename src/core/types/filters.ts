export type ActiveFilters = {
  googleRating: string;
  regions: string[];
  categories: string[];
};

export type SetActiveFilterPayload = {
  name: 'googleRating' | 'categories' | 'regions';
  value: string;
};
