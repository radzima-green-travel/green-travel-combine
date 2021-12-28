import {
  isPlainObject,
  mapValues,
  has,
  reduce,
  compact,
  map,
  pick,
  orderBy,
} from 'lodash';

import {
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorSchemeName,
  Linking,
} from 'react-native';
import {MultiPolygon, LineString} from '@turf/helpers';

import {
  ITransformedData,
  ITransformedCategory,
  IObject,
  ICategoriesMap,
  IInclude,
  IBelongsTo,
  IObejctsMap,
  IObejctsToCategoryMap,
  IOrigins,
} from 'core/types';
import {imagesService} from 'services/ImagesService';
import {ListMobileDataQuery} from 'api/graphql/types';

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

export function transformQueryData(
  dataQuery: ListMobileDataQuery,
): ITransformedData {
  const transformedData: ITransformedData = {
    objectsMap: {},
    categories: [],
    categoriesMap: {},
    objectsToCategoryMap: {},
  };

  const {listMobileData} = dataQuery;

  if (listMobileData) {
    const {categories, objects} = listMobileData;

    const sortedCategories = orderBy(categories, ['index'], ['asc']);

    const objectsToCategoryMap: IObejctsToCategoryMap = {};
    const categoriesMap = reduce(
      sortedCategories,
      (acc, category) => {
        if (category) {
          acc[category.id] = {
            id: category.id,
            name: category.name,
            path: '',
            icon: category.icon || '',
            cover: category.cover
              ? imagesService.getImageProxy(category.cover)
              : null,
            parent: category.parent || undefined,
            updatedAt: category.updatedAt,
            fields: compact(category.fields),
            children: reduce(
              sortedCategories,
              (acc, cat) =>
                cat?.parent === category.id ? [...acc, cat.id] : acc,
              [] as string[],
            ),
            objects: reduce(
              objects?.items,
              (acc, object) =>
                object && object?.categoryId === category.id
                  ? [...acc, object.id]
                  : acc,
              [] as string[],
            ),
          };
        }

        return acc;
      },
      {} as ICategoriesMap,
    );

    const objectsMap = reduce(
      objects?.items,
      (acc, object) => {
        if (object) {
          objectsToCategoryMap[object.id] = object.category?.id!;
          const objectData: IObject = {
            id: object.id,
            name: object.name,
            description: object.description || '',
            address: object.address || '',
            area: (object.area as MultiPolygon) || null,
            location:
              object.location?.lat && object.location?.lon
                ? {
                    lat: object.location?.lat,
                    lon: object.location?.lon,
                  }
                : null,
            category: {
              icon: object.category?.icon || '',
              id: object.category?.id || '',
              name: object.category?.name || '',
              parent: object.category?.parent || null,
              singularName: object.category?.singularName || '',
            },
            cover: object.cover
              ? imagesService.getImageProxy(object.cover)
              : '',
            images: compact(
              map(object.images, img =>
                img ? imagesService.getImageProxy(img) : img,
              ),
            ),
            include: reduce(
              object.include,
              (acc, categoryId) => {
                if (categoryId && categoriesMap[categoryId]) {
                  return [
                    ...acc,
                    pick(categoriesMap[categoryId], [
                      'id',
                      'name',
                      'icon',
                      'objects',
                    ]),
                  ];
                }

                return acc;
              },
              [] as IInclude[],
            ),
            belongsTo: reduce(
              object.belongsTo,
              (acc, categoryId) => {
                if (categoryId && categoriesMap[categoryId]) {
                  return [
                    ...acc,
                    pick(categoriesMap[categoryId], [
                      'id',
                      'name',
                      'icon',
                      'objects',
                    ]),
                  ];
                }

                return acc;
              },
              [] as IBelongsTo[],
            ),
            url: object.url || undefined,
            routes: (object.routes as LineString) || undefined,
            length: object.length || null,
            origins: (object.origins as IOrigins[]) || null,
          };

          return {
            ...acc,
            [object.id]: objectData,
          };
        }

        return acc;
      },
      {} as IObejctsMap,
    );

    return {
      objectsMap,
      categories: reduce(
        sortedCategories,
        (acc, category) => {
          if (category && !category.parent) {
            return [...acc, categoriesMap[category.id]];
          }
          return acc;
        },
        [] as ITransformedCategory[],
      ),
      categoriesMap: categoriesMap,
      objectsToCategoryMap: objectsToCategoryMap,
    };
  }

  return transformedData;
}

export function isLocationExist(object: IObject) {
  return Boolean(object?.location?.lat && object.location.lon);
}

export function getScreenTimeSec(startMs: number, endMs: number) {
  return Math.floor((endMs - startMs) / 1000);
}
