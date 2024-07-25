export type ActiveFilters = {
  googleRating: string | null;
  regions: string[] | null;
  categories: string[] | null;
};

export type SetActiveFilterPayload =
  | {
      name: 'googleRating';
      value: string | null;
    }
  | {
      name: 'regions';
      value: string;
    }
  | {
      name: 'categories';
      value: string;
    };
