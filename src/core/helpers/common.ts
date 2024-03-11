import {
  isPlainObject,
  mapValues,
  has,
  reduce,
  compact,
  map,
  orderBy,
  some,
  find,
  keyBy,
  filter,
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
  IObjectsMap,
  IObjectsToCategoryMap,
  IOrigins,
  SupportedLocales,
  CategoryI18n,
  ObjectI18n,
  TestIDs,
  ISpotsMap,
  SpotI18n,
} from 'core/types';
import {imagesService} from 'services/ImagesService';
import {
  ListMobileDataQuery,
  ListMobileDataQueryObject,
} from 'api/graphql/types';
import transliterate from './transliterate';

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

function getCategoryTranslation(
  category: {i18n?: CategoryI18n; name?: string; singularName?: string},
  currentLocale: SupportedLocales,
): {name: string; singularName: string} {
  const i18nObject = find(
    category.i18n,
    translate => translate?.locale === currentLocale,
  );
  const name = currentLocale === 'ru' ? category.name : i18nObject?.name;

  const singularName =
    currentLocale === 'ru' ? category.singularName : i18nObject?.singularName;

  return {
    name: name || '',
    singularName: singularName || '',
  };
}

function getObjectTranslation(
  object: {
    i18n?: ObjectI18n;
    name?: string;
    description?: string | null;
    address?: string | null;
  },
  currentLocale: SupportedLocales,
): {name: string; description: string; address: string} {
  const i18nObject = find(
    object.i18n,
    translate => translate?.locale === currentLocale,
  );

  const name = currentLocale === 'ru' ? object.name : i18nObject?.name;

  const description =
    currentLocale === 'ru' ? object.description : i18nObject?.description;

  const address = currentLocale === 'ru' ? object.address : i18nObject?.address;

  return {
    name: name || '',
    description: description || '',
    address: address || '',
  };
}

function getSpotTranslation(
  spot: {i18n?: SpotI18n; value: string},
  currentLocale: SupportedLocales,
): string {
  const i18nObject = find(
    spot.i18n,
    translate => translate?.locale === currentLocale,
  );

  const value = currentLocale === 'ru' ? spot.value : i18nObject?.value;

  return value || '';
}

const objectCompletnessInfo = (
  object: ListMobileDataQueryObject | null,
  objectRootCategory: ITransformedCategory | null,
) => {
  const imcompletedFieldsNames = filter(
    objectRootCategory?.completenessFields,
    fieldName => {
      return !object?.[fieldName];
    },
  );

  const amountOfImcompletedFields = imcompletedFieldsNames.length;
  const amountOfCompletenessFields =
    objectRootCategory?.completenessFields?.length || 0;
  const percentageOfCompletion =
    amountOfCompletenessFields &&
    amountOfCompletenessFields >= amountOfImcompletedFields
      ? Math.round(
          (1 - amountOfImcompletedFields / amountOfCompletenessFields) * 100,
        )
      : 0;

  return {
    imcompletedFieldsNames,
    percentageOfCompletion,
  };
};

export function transformQueryData(
  dataQuery: ListMobileDataQuery,
  currentLocale: SupportedLocales,
): ITransformedData {
  const transformedData: ITransformedData = {
    objectsMap: {},
    categories: [],
    categoriesMap: {},
    objectsToCategoryMap: {},
  };
  const {listMobileData} = dataQuery;

  if (listMobileData) {
    const {categories, objects, spots} = listMobileData;

    const sortedCategories = orderBy(categories, ['index'], ['asc']);

    const objectsToCategoryMap: IObjectsToCategoryMap = {};

    const categoriesMap = reduce(
      sortedCategories,
      (acc, category) => {
        if (category) {
          const {name, singularName} = getCategoryTranslation(
            category,
            currentLocale,
          );

          acc[category.id] = {
            id: category.id,
            name,
            singularName,
            path: '',
            icon: category.icon || '',
            cover: category.cover
              ? imagesService.getOriginalImage(category.cover)
              : null,
            blurhash: category.blurhash || '',

            parent: category.parent || undefined,
            updatedAt: category.updatedAt,
            fields: compact(category.fields),
            completenessFields: compact(category.completenessFields),
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

    const spotsMap = keyBy(spots, 'id') as ISpotsMap;

    const objectsMap = reduce(
      objects?.items,
      (acc, object) => {
        if (object) {
          const {name, description} = getObjectTranslation(
            object,
            currentLocale,
          );

          objectsToCategoryMap[object.id] = object.categoryId;

          const objectCategory = categoriesMap[object.categoryId];

          function getObjectRelatedData(
            objectIds?: Array<string | null> | null,
          ): IInclude[] | IBelongsTo[] {
            return reduce(
              objectIds,
              (relatedAcc, objectId) => {
                const categoryId: string | undefined = objects?.items?.find(
                  el => el?.id === objectId,
                )?.categoryId;

                if (categoryId && objectId) {
                  const categoryData = categoriesMap[categoryId];
                  if (some(relatedAcc, ({id}) => id === categoryId)) {
                    return map(relatedAcc, item => {
                      return item.id === categoryId
                        ? {
                            ...item,
                            objects: [...item.objects, objectId],
                          }
                        : item;
                    });
                  } else if (categoryData) {
                    return [
                      ...relatedAcc,
                      {
                        id: categoryData.id,
                        name: categoryData.name,
                        icon: categoryData.icon,
                        objects: [objectId],
                      },
                    ];
                  }
                }

                return relatedAcc;
              },
              [] as IInclude[] | IBelongsTo[],
            );
          }

          function getObjectAddress(): string {
            const address: string[] = [];
            const [
              {
                regionId = '',
                subRegionId = '',
                municipalityId = '',
                street = '',
              } = {},
            ] = object?.addresses?.items ?? [];

            [regionId, subRegionId, municipalityId].forEach(id => {
              if (id && spotsMap[id]) {
                const spotName = getSpotTranslation(
                  spotsMap[id],
                  currentLocale,
                );

                spotName && address.push(spotName);
              }
            });

            if (street) {
              address.push(
                // TODO: temporary workaround. Replace with translation once available
                currentLocale === 'ru' ? street : transliterate(street),
              );
            }

            return address.join(', ');
          }

          const {percentageOfCompletion, imcompletedFieldsNames} =
            objectCompletnessInfo(object, objectCategory);

          const objectData: IObject = {
            id: object.id,
            name,
            description,
            address: getObjectAddress(),
            area: (object.area as MultiPolygon) || null,
            location:
              object.location?.lat && object.location?.lon
                ? {
                    lat: object.location?.lat,
                    lon: object.location?.lon,
                  }
                : null,
            category: {
              icon: objectCategory?.icon || '',
              id: objectCategory?.id || '',
              name: objectCategory?.name,
              parent: objectCategory?.parent || null,
              singularName: objectCategory?.singularName || '',
              imcompletedFieldsNames: imcompletedFieldsNames,
              percentageOfCompletion: percentageOfCompletion,
            },
            cover: object.cover
              ? imagesService.getOriginalImage(object.cover)
              : '',
            blurhash: object.blurhash || '',
            images: compact(
              map(object.images, img =>
                img ? imagesService.getOriginalImage(img) : img,
              ),
            ),

            include: getObjectRelatedData(object.include),
            belongsTo: getObjectRelatedData(object.belongsTo),
            url: object.url || undefined,
            routes: (object.routes as LineString) || undefined,
            length: object.length || null,
            origins: (object.origins as IOrigins[]) || null,
            phoneNumber: object.phoneNumber || undefined,
            workingHours: object.workingHours || undefined,
            visitedObject: 'You’ve visited it!',
          };

          return {
            ...acc,
            [object.id]: objectData,
          };
        }

        return acc;
      },
      {} as IObjectsMap,
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

export function composeTestID(
  testID: TestIDs | string,
  secondId: string | number,
) {
  return typeof secondId === 'string'
    ? `${testID}_${secondId}`
    : `${testID}_${secondId + 1}`;
}

export function getLanguageByLocale(lang: SupportedLocales | null) {
  if (lang === 'en') {
    return 'English';
  } else if (lang === 'ru') {
    return 'Русский';
  }

  return null;
}

export const createNumericArray = (length: number) => {
  return Array.from({length}, (_, index) => index + 1);
};
