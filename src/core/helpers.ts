import {
  isPlainObject,
  mapValues,
  has,
  map,
  includes,
  isEmpty,
  reduce,
  find,
  filter,
} from 'lodash';

import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorSchemeName,
  Linking,
} from 'react-native';

import {
  ICategory,
  IBookmarksIds,
  ICategoryWithExtendedObjects,
  IExtendedObject,
  ITransformedData,
  ITransformedCategory,
} from 'core/types';

export const extractThemeStyles = (
  styles: Object,
  theme: ColorSchemeName,
): {[propName: string]: StyleProp<ViewStyle | TextStyle>} => {
  return mapValues(styles, value => {
    return isPlainObject(value) && (has(value, 'dark') || has(value, 'light'))
      ? value[theme!]
      : value;
  });
};

export const addIsFavoriteToObjects = (
  categories: ICategory[],
  bookmarksIds: IBookmarksIds,
) => {
  return map(categories, value => {
    if (isEmpty(value.children)) {
      return {
        ...value,
        objects: map(value.objects, object => {
          return {
            ...object,
            isFavorite: includes(bookmarksIds, object._id),
          };
        }),
      };
    } else {
      return {
        ...value,
        children: addIsFavoriteToObjects(value.children, bookmarksIds),
      };
    }
  });
};

const findCategoryById = (
  categories: ICategoryWithExtendedObjects[],
  id: string,
): ICategoryWithExtendedObjects | null => {
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    if (category._id === id) {
      return category;
    }

    if (!isEmpty(category.children)) {
      const foundCategory = findCategoryById(category.children, id);
      if (foundCategory) {
        return foundCategory;
      }
    }
  }
  return null;
};

export const findCategoriesById = (
  categories: ICategoryWithExtendedObjects[],
  id: string,
): ICategoryWithExtendedObjects[] | null => {
  return findCategoryById(categories, id)?.children || null;
};

export const findObjectsByCategoryId = (
  categories: ICategoryWithExtendedObjects[],
  id: string,
  objectIds?: string[],
): IExtendedObject[] | null => {
  const result = findCategoryById(categories, id)?.objects || null;
  return objectIds
    ? filter(result, ({_id}) => includes(objectIds, _id))
    : result;
};

export const findObject = (
  categories: ICategoryWithExtendedObjects[],
  categoryId: string,
  id: string,
) => {
  return find(findObjectsByCategoryId(categories, categoryId), {_id: id});
};

export const filterDeepObjects = (
  categories: ICategoryWithExtendedObjects[],
  predicate: (item: IExtendedObject, index: number) => boolean,
): ICategoryWithExtendedObjects[] => {
  return map(categories, category => {
    return {
      ...category,
      objects: filter(category.objects, predicate),
      children: filterDeepObjects(category.children, predicate),
    };
  });
};

export const flattenCategories = (
  categories: ICategoryWithExtendedObjects[],
): ICategoryWithExtendedObjects[] => {
  return reduce(
    categories,
    (acc, category) => {
      return [...acc, category, ...flattenCategories(category.children)];
    },
    [] as ICategoryWithExtendedObjects[],
  );
};

export async function tryOpenURL(url: string) {
  try {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn(`Don't know how to open URI: ${url}`);
    }
  } catch (e) {
    console.warn(e.message);
  }
}

export function transformMainData(data: ICategory[]): ITransformedData {
  const transformedData: ITransformedData = {
    objectsMap: {},
    categories: [],
    categoriesMap: {},
    objectsToCategoryMap: {},
  };

  function traverse(categories: ICategory[]): ITransformedCategory[] {
    if (isEmpty(categories)) {
      return [];
    }

    return map(categories, category => {
      const objects: string[] = map(category.objects, object => {
        transformedData.objectsMap[object._id] = object;
        transformedData.objectsToCategoryMap[object._id] = category._id;
        return object._id;
      });

      const transforedCategories = traverse(category.children);

      const children = map(transforedCategories, cat => {
        transformedData.categoriesMap[cat._id] = cat;
        return cat._id;
      });

      const tramsformedCategory = {
        ...category,
        children,
        objects,
      };

      transformedData.categoriesMap[
        tramsformedCategory._id
      ] = tramsformedCategory;

      return tramsformedCategory;
    });
  }

  transformedData.categories = traverse(data);

  return transformedData;
}
