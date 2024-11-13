import type {IconsNames} from 'atoms/Icon';
import {SearchFilters} from './filters';

export type SearchOptions = {
  byAddress: boolean;
  byDescription: boolean;
};

export type SearchFiltersItem = {
  id: keyof SearchFilters;
  value: string;
  icon?: IconsNames;
};
