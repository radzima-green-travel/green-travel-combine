import {ObjectFiltersAggregationsDTO, SpotItemDTO} from 'core/types';
import {reduce, chain} from 'lodash';

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
    categoriesWithNumberOfItems: transformBucketsToCountMap(
      aggregations?.categories?.facets?.buckets || [],
    ),
    regionsWithNumberOfItems: transformBucketsToCountMap(
      aggregations?.regions?.facets?.buckets || [],
    ),
    municipalitiesWithNumberOfItems: transformBucketsToCountMap(
      aggregations?.municipalities?.facets?.buckets || [],
    ),
  };
}

export function prepareFiltersSettlements(
  settlements: SpotItemDTO[],
  {
    municipalitiesWithNumberOfItems,
  }: {municipalitiesWithNumberOfItems: {[key: string]: number}},
) {
  const sections = reduce(
    settlements,
    (acc, item) => {
      const firstLetter = item.value[0];
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      if (municipalitiesWithNumberOfItems?.[item.id]) {
        acc[firstLetter].push(item);
      }
      return acc;
    },
    {} as {[key: string]: SpotItemDTO[]},
  );

  return chain(sections)
    .pickBy(value => value.length)
    .map((data = [], title) => ({title, data}))
    .value();
}
