import {CategoryShort, HomeSectionBarItem, ObjectShort} from 'core/types';
import {
  CategoryShortDTO,
  ListShortObjectsResponseDTO,
  ObjectShortDTO,
} from 'core/types/api';
import {filter, groupBy, isEmpty, map, orderBy, reduce} from 'lodash';
import {
  convertShortCategoryToCardItem,
  convertShortObjectToCardItem,
} from './common';

export function getCategoriesWithObjects(
  categoriesList: Array<CategoryShortDTO>,
) {
  const parentSet = reduce(
    categoriesList,
    (acc, category) => {
      if (category.parent) {
        acc.add(category.parent);
      }
      return acc;
    },
    new Set<string>(),
  );

  return filter(categoriesList, category => {
    return !parentSet.has(category.id);
  });
}

export function getObjectByCategories(
  categoriesList: Array<CategoryShortDTO>,
  objectsCollectionResponse: Array<ListShortObjectsResponseDTO>,
) {
  const objectsCollection = map(objectsCollectionResponse, 'items');
  return reduce(
    categoriesList,
    (acc, category, index) => {
      const objects = objectsCollection[index];

      if (objects) {
        acc[category.id] = objects;
      }

      return acc;
    },
    {} as Record<string, Array<ObjectShortDTO>>,
  );
}

export function prepareHomePageData(
  categoriesList: Array<CategoryShort>,
  objectsByCategories: Record<string, Array<ObjectShort>>,
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
          title: category.name,
          items: map(objects, convertShortObjectToCardItem),
          isCategoryItems: false,
          categoryId: category.id,
        });
      } else {
        const subCategories = subcategoriesMap[category.id];
        const subCategoriesWithObjects = filter(subCategories, subCategory => {
          return !isEmpty(objectsByCategories[subCategory.id]);
        });
        if (subCategoriesWithObjects?.length) {
          acc.push({
            title: category.name,
            items: map(
              subCategoriesWithObjects,
              convertShortCategoryToCardItem,
            ),
            isCategoryItems: true,
            categoryId: category.id,
          });
        }
      }

      return acc;
    },
    [] as Array<HomeSectionBarItem>,
  );
}
