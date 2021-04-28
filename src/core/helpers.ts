import {isPlainObject, mapValues, has, map, isEmpty} from 'lodash';

import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorSchemeName,
  Linking,
} from 'react-native';

import {ICategory, ITransformedData, ITransformedCategory} from 'core/types';
import {isIOS} from 'services/PlatformService';

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

export function hexWithAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (isFinite(alpha)) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

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

export function getMapAppLink(latitude: string, longitude: string): string {
  return isIOS
    ? `http://maps.apple.com/?daddr=${latitude},${longitude}`
    : `geo:0,0?q=${latitude},${longitude}(${value})`;
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
