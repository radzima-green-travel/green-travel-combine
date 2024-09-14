import {
  ActiveFilters,
  FiltersParams,
  ObjectFiltersAggregationsDTO,
} from 'core/types';
import {reduce} from 'lodash';

export const transformBucketsToCountMap = (
  buckets: {key: string; doc_count: number}[],
): {[key: string]: number} =>
  reduce(
    buckets,
    (acc, {key, doc_count}) => {
      acc[key] = doc_count;
      return acc;
    },
    {},
  );

export function prepareGoogleRatings(
  ratings: {
    key: string;
    from: number;
  }[],
) {
  return reduce(
    ratings,
    (acc, {from, key}) => {
      if (from >= 3.5) {
        acc.push({
          id: String(from),
          value: key,
        });
      }
      return acc;
    },
    [] as {id: string; value: string}[],
  );
}

export function prepareAggregationsWithNumberOfItems(
  aggregations?: ObjectFiltersAggregationsDTO,
) {
  return {
    settlementsWithNumberOfItems: transformBucketsToCountMap(
      aggregations?.municipalities?.facets?.buckets || [],
    ),
    regionsWithNumberOfItems: transformBucketsToCountMap(
      aggregations?.regions?.facets?.buckets || [],
    ),
  };
}

export const transformActiveFiltersToFilterParam = (
  activeFilters: ActiveFilters,
): FiltersParams => {
  const {distance} = activeFilters;
  return {
    ...(distance && distance.isOn && distance.location
      ? {
          km: distance.value,
          location: {lat: distance.location.lat, lon: distance.location.lon},
        }
      : {}),
    filter: {
      statuses: ['published'],
      googleRating: activeFilters.googleRating || undefined,
      categories: activeFilters.categories?.length
        ? activeFilters.categories
        : undefined,
      regions: activeFilters.regions?.length
        ? activeFilters.regions
        : undefined,
      municipalities: activeFilters.municipalities?.length
        ? activeFilters.municipalities
        : undefined,
    },
  };
};
