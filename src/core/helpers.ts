import {isPlainObject, mapValues, has, map, isEmpty} from 'lodash';

import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorSchemeName,
  Linking,
} from 'react-native';

import {
  ICategory,
  ITransformedData,
  ITransformedCategory,
  IObject,
} from 'core/types';
import {imagesService} from 'services/ImagesService';
import {SCREEN_WIDTH} from 'services/PlatformService';
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
        transformedData.objectsMap[object.id] = {
          ...object,
          cover: imagesService.getImageProxy(object.cover, SCREEN_WIDTH * 2),
          images: map(object.images, img => imagesService.getImageProxy(img)),
        };
        transformedData.objectsToCategoryMap[object.id] = category.id;
        return object.id;
      });

      const transforedCategories = traverse(category.children);

      const children = map(transforedCategories, cat => {
        transformedData.categoriesMap[cat.id] = {
          ...cat,
          cover: cat.cover
            ? imagesService.getImageProxy(cat.cover, SCREEN_WIDTH * 2)
            : cat.cover,
        };
        return cat.id;
      });

      const tramsformedCategory = {
        ...category,
        children,
        objects,
      };

      transformedData.categoriesMap[tramsformedCategory.id] =
        tramsformedCategory;

      return tramsformedCategory;
    });
  }

  transformedData.categories = traverse(data);

  return transformedData;
}

export function isLocationExist(object: IObject) {
  return Boolean(object?.location?.lat && object.location.lon);
}

export function getScreenTimeSec(startMs: number, endMs: number) {
  return Math.floor((endMs - startMs) / 1000);
}

function rejectDelay(reason, timeout) {
  return new Promise(function (resolve, reject) {
    setTimeout(reject.bind(null, reason), timeout);
  });
}

export function withRetry(
  promise: (reason: any) => PromiseLike<never>,
  {timeout = 500, attempts = 5}: {timeout?: number; attempts?: number} = {},
) {
  let p = Promise.reject();

  for (var i = 0; i < attempts; i++) {
    p = p.catch(promise).catch(e => rejectDelay(e, timeout)) as Promise<never>;
  }

  return p;
}
