import {
  CategoryShort,
  HomePageCategory,
  HomePagesCategories,
  SupportedLocales,
} from 'core/types';
import {
  CategoriesAggregationsByObjectsResponseDTO,
  ObjectsForCategoriesResponseDTO,
  ObjectShortDTO,
  ObjectThumbnailDTO,
  PlaceOfTheWeekObjectDTO,
} from 'core/types/api';
import {filter, map, orderBy, reduce} from 'lodash';
import {
  convertPlaceOfTheWeekObjectToCardItem,
  extractLocaleSpecificValues,
  translateAndProcessImagesForEntity,
} from './common';
import {GRAPHQL_QUERY_CATEGORY_INDEX} from 'api/graphql';

export function getCategoriesWithObjects(
  categoriesAggregations: CategoriesAggregationsByObjectsResponseDTO,
) {
  return filter(categoriesAggregations, category => category.doc_count !== 0);
}

export function getObjectByCategories(
  categoriesAggreagions: CategoriesAggregationsByObjectsResponseDTO,
  objectsForCategoriesResponse: ObjectsForCategoriesResponseDTO,
) {
  return reduce(
    categoriesAggreagions,
    (acc, category, index) => {
      const objects =
        objectsForCategoriesResponse[`${GRAPHQL_QUERY_CATEGORY_INDEX}${index}`]
          ?.items;

      if (objects) {
        acc[category.key] = objects;
      }

      return acc;
    },
    {} as Record<string, ObjectShortDTO[]>,
  );
}

export function convertShortCategoryToHomePageCategory(
  category: CategoryShort,
  parentCategoryName: string | null,
): HomePageCategory {
  return {
    id: category.id,
    icon: category.icon,
    name: category.name,
    analyticsMetadata: {
      name: category.analyticsMetadata.name,
      parentName: parentCategoryName,
    },
  };
}

export function prepareHomePageData(
  categoriesList: CategoryShort[],
): HomePagesCategories {
  const sortedCategories = orderBy(categoriesList, ['index'], ['asc']);

  return reduce(
    sortedCategories,
    (acc, category) => {
      if (!category.parent) {
        acc.main.push(convertShortCategoryToHomePageCategory(category, null));
      } else {
        const sectionName =
          category.widgetType === 'ROUTES_WIDGET' ? 'routes' : 'main';
        acc[sectionName].push({
          ...convertShortCategoryToHomePageCategory(category, category.name),
        });
      }

      return acc;
    },
    {main: [], routes: []} as HomePagesCategories,
  );
}

export function preparePlaceOfTheWeekObject(
  placeOfTheWeek: PlaceOfTheWeekObjectDTO | null,
  locale: SupportedLocales | null,
) {
  if (!placeOfTheWeek) {
    return null;
  }
  return convertPlaceOfTheWeekObjectToCardItem({
    ...translateAndProcessImagesForEntity(placeOfTheWeek, locale),
    category: extractLocaleSpecificValues(placeOfTheWeek.category, locale),
  });
}

export function prepareRandomObject(
  objects: ObjectThumbnailDTO[],
  locale: SupportedLocales | null,
) {
  return map(objects, object => {
    const {analyticsMetadata: categoryAnalyticsMetadata} =
      extractLocaleSpecificValues(object.category, locale);

    const randomObjectData = extractLocaleSpecificValues(object, locale);

    return {
      ...randomObjectData,
      analyticsMetadata: {
        objectName: randomObjectData.analyticsMetadata.name,
        categoryName: categoryAnalyticsMetadata.name,
      },
    };
  });
}
