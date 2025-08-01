import {
  SearchFilters,
  FiltersParams,
  ObjectFiltersAggregationsDTO,
  GoogleRatingsAggregationsByObjectsDTO,
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
  ratings: GoogleRatingsAggregationsByObjectsDTO[],
) {
  return reduce(
    ratings,
    (acc, {from, key, doc_count}) => {
      if (from >= 3.5) {
        acc.push({
          id: String(from),
          value: key,
          disabled: !doc_count,
        });
      }
      return acc;
    },
    [] as {id: string; value: string; disabled: boolean}[],
  );
}

export function prepareAggregationsWithNumberOfItems(
  aggregations?: ObjectFiltersAggregationsDTO,
) {
  return {
    categoriesWithNumberOfItems: transformBucketsToCountMap(
      aggregations?.categories?.facets?.buckets || [],
    ),

    settlementsWithNumberOfItems: transformBucketsToCountMap(
      aggregations?.municipalities?.facets?.buckets || [],
    ),
    regionsWithNumberOfItems: transformBucketsToCountMap(
      aggregations?.regions?.facets?.buckets || [],
    ),
  };
}

export const transformActiveFiltersToFilterParam = ({
  filters,
  userId,
}: {
  filters: SearchFilters;
  userId?: string;
}): FiltersParams => {
  const {distance, excludeVisited} = filters;
  return {
    ...(distance && distance.isOn && distance.location
      ? {
          km: distance.value,
          location: {lat: distance.location.lat, lon: distance.location.lon},
        }
      : {}),

    filter: {
      ...(excludeVisited && userId ? {userId} : {}),
      googleRating: filters.googleRating || undefined,
      categories: filters.categories?.length ? filters.categories : undefined,
      regions: filters.regions?.length ? filters.regions : undefined,
      municipalities: filters.municipalities?.length
        ? filters.municipalities
        : undefined,
      ...(filters.markedAsNotOnGoogleMaps && {
        markedAsNotOnGoogleMaps: filters.markedAsNotOnGoogleMaps,
      }),
      ...(filters.objectIds?.length && {ids: filters.objectIds}),
    },
  };
};

export const checkIfFiltersAreUnset = (filters?: SearchFilters) => {
  return (
    !filters ||
    (!filters.categories?.length &&
      !filters.googleRating?.length &&
      !filters.municipalities?.length &&
      !filters.regions?.length &&
      !filters.distance?.isOn &&
      !filters.excludeVisited)
  );
};

export const prepareNumberOfAppliedFilters = ({
  filters,
  isAuthorized,
}: {
  filters?: SearchFilters;
  isAuthorized: boolean;
}) => {
  if (!filters) {
    return 0;
  }

  let numberOfAppliedFilters = 0;
  if (filters.categories?.length) {
    numberOfAppliedFilters += 1;
  }
  if (filters.googleRating?.length) {
    numberOfAppliedFilters += 1;
  }
  if (filters.municipalities?.length) {
    numberOfAppliedFilters += 1;
  }
  if (filters.regions?.length) {
    numberOfAppliedFilters += 1;
  }
  if (filters.distance?.isOn) {
    numberOfAppliedFilters += 1;
  }
  if (filters.excludeVisited && isAuthorized) {
    numberOfAppliedFilters += 1;
  }
  return numberOfAppliedFilters;
};
