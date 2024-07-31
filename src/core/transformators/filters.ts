import {map} from 'lodash';
import {extractLocaleSpecificValues} from './common';
import {
  SupportedLocales,
  RegionsListResponseDTO,
  ObjectFiltersAggregationsDTO,
} from 'core/types';

export const transformBucketsToCountMap = (
  buckets: {key: string; doc_count: number}[],
): {[key: string]: number} =>
  buckets.reduce((acc, {key, doc_count}) => {
    acc[key] = doc_count;
    return acc;
  }, {});

export function prepareRegionsObject(
  regions: RegionsListResponseDTO,
  locale: SupportedLocales | null,
) {
  return map(regions, item => {
    return {
      id: item.id,
      value: extractLocaleSpecificValues(item, locale).value,
    };
  });
}

export function prepareGoogleRatings(
  ratings: {
    key: string;
    from: number;
  }[],
) {
  return map(ratings, ({from, key}) => {
    return {
      id: String(from),
      value: key,
    };
  });
}

export function prepareAggregationsWithNumberOfItems(
  aggregations?: ObjectFiltersAggregationsDTO,
) {
  return {
    categoriesWithNumberOfItems: transformBucketsToCountMap(
      aggregations?.categories?.facets?.buckets || [],
    ),
    regionsWithNumberOfItems: transformBucketsToCountMap(
      aggregations?.regions?.facets?.buckets || [],
    ),
  };
}
