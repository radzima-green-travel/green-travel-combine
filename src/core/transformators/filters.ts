import {map, reduce, orderBy, groupBy, filter, isEmpty} from 'lodash';
import {extractLocaleSpecificValues} from './common';
import {
  SupportedLocales,
  RegionsListResponseDTO,
  ObjectFiltersAggregationsDTO,
  CategoryShortDTO,
  ObjectShortDTO,
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
      regionId: item.id,
      title: extractLocaleSpecificValues(item, locale).value,
    };
  });
}

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

export function prepareCategories(
  categoriesList: Array<CategoryShortDTO>,
  objectsByCategories: Record<string, ObjectShortDTO[]>,
  locale: SupportedLocales | null,
) {
  const sortedCategories = orderBy(categoriesList, ['index'], ['asc']);

  const {null: parentCategories, ...subcategoriesMap} = groupBy(
    sortedCategories,
    'parent',
  );

  return reduce(
    parentCategories,
    (acc, category) => {
      let objects = objectsByCategories[category.id];

      if (objects?.length && !category.parent) {
        acc.push({
          title: extractLocaleSpecificValues(category, locale).name,
          categoryId: category.id,
        });
      } else {
        const subCategories = subcategoriesMap[category.id];
        const subCategoriesWithObjects = filter(subCategories, subCategory => {
          return !isEmpty(objectsByCategories[subCategory.id]);
        });
        if (subCategoriesWithObjects?.length) {
          acc.push({
            title: extractLocaleSpecificValues(category, locale).name,
            categoryId: category.id,
          });
        }
      }

      return acc;
    },
    [] as Array<{title: string; categoryId: string}>,
  );
}
