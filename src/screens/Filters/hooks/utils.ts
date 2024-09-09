import {ActiveFilters} from 'core/types';

export const areAllActiveFiltersUnser = (activeFilters: ActiveFilters) => {
  return (
    !activeFilters.categories.length &&
    !activeFilters.googleRating.length &&
    !activeFilters.municipalities.length &&
    !activeFilters.regions.length &&
    !activeFilters.distance.isOn
  );
};
