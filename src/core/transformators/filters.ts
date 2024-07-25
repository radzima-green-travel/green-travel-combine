import {map} from 'lodash';
import {getSpotTranslation} from './common';
import {SupportedLocales} from 'core/types';

import {RegionsListResponseDTO} from './../types/api/graphql';

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
      value: getSpotTranslation(item, locale ?? 'en'),
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
      key: String(from),
      label: key,
    };
  });
}

export function prepareAggregationsWithNumberOfItems(
  aggregations:
    | {
        categories: {
          facets: {
            buckets: {
              key: string;
              doc_count: number;
            }[];
          };
        };
        regions: {
          facets: {
            buckets: {
              key: string;
              doc_count: number;
            }[];
          };
        };
        googleRatings: {
          facets: {
            buckets: {
              key: string;
              from: number;
            }[];
          };
        };
      }
    | undefined,
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
