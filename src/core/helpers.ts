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
  IObject,
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
            isFavorite: includes(bookmarksIds, object.id),
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
  categories: ICategory[],
  id: string,
): ICategory | null => {
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    if (category.id === id) {
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
  categories: ICategory[],
  id: string,
): ICategory[] | null => {
  return findCategoryById(categories, id)?.children || null;
};

export const findObjectsByCategoryId = (
  categories: ICategory[],
  id: string,
  objectIds?: string[],
): IObject[] | null => {
  const result = findCategoryById(categories, id)?.objects || null;
  return objectIds ? filter(result, ({id}) => includes(objectIds, id)) : result;
};

export const findObject = (
  categories: ICategory[],
  categoryId: string,
  id: string,
) => {
  return find(findObjectsByCategoryId(categories, categoryId), {id: id});
};

export const filterDeepObjects = (
  categories: ICategory[],
  predicate: (item: IObject, index: number) => boolean,
): ICategory[] => {
  return map(categories, category => {
    return {
      ...category,
      objects: filter(category.objects, predicate),
      children: filterDeepObjects(category.children, predicate),
    };
  });
};

export const flattenCategories = (categories: ICategory[]): ICategory[] => {
  return reduce(
    categories,
    (acc, category) => {
      return [...acc, category, ...flattenCategories(category.children)];
    },
    [] as ICategory[],
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
        transformedData.objectsMap[object.id] = object;
        transformedData.objectsToCategoryMap[object.id] = category.id;
        return object.id;
      });

      const transforedCategories = traverse(category.children);

      const children = map(transforedCategories, cat => {
        transformedData.categoriesMap[cat.id] = cat;
        return cat.id;
      });

      const tramsformedCategory = {
        ...category,
        children,
        objects,
      };

      transformedData.categoriesMap[
        tramsformedCategory.id
      ] = tramsformedCategory;

      return tramsformedCategory;
    });
  }

  transformedData.categories = traverse(data);

  return transformedData;
}
