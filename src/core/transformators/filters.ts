import {map, filter} from 'lodash';
import {ObjectFiltersAggregationsDTO, SpotItemDTO} from 'core/types';

export const transformBucketsToCountMap = (
  buckets: {key: string; doc_count: number}[],
): {[key: string]: number} =>
  buckets.reduce((acc, {key, doc_count}) => {
    acc[key] = doc_count;
    return acc;
  }, {});

export function prepareGoogleRatings(
  ratings: {
    key: string;
    from: number;
  }[],
) {
  return map(
    filter(ratings, ({from}) => from >= 3.5),
    ({from, key}) => {
      return {
        id: String(from),
        value: key,
      };
    },
  );
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

export function prepareFiltersSettlements(settlements: SpotItemDTO[]) {
  const sections = settlements.reduce((acc, item) => {
    const firstLetter = item.value[0];
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {});

  return Object.keys(sections).map(key => ({
    title: key,
    data: sections[key],
  }));
}
