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
  isEmpty,
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
  TestIDs,
  ISpotsMap,
  SpotI18n,
  IObjectAddititonalInfoItem,
} from 'core/types';
import {imagesService} from 'services/ImagesService';
import {
  AccommodationPlaceItem,
  DinnerPlacesItem,
  i18nType,
  ListMobileDataQuery,
  ListMobileDataQueryObject,
  UpcomingEventsItem,
} from 'api/graphql/types';
import transliterate from './transliterate';
import {dateToReadableString, isDateInThePast} from './date';
import {ObjectField} from 'core/constants';

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

export const sanitizePhoneNumber = (phoneNumber: string) => {
  const plus = phoneNumber.startsWith('+') ? '+' : '';
  const digits = phoneNumber.replace(/\D/g, '');

  return `${plus}${digits}`;
};

export const removePunctuation = (input: string) => {
  const punctuation = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~«»]/g;
  return input.replace(punctuation, '');
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

function getTranslationsForProperties<T extends string>(
  originalValues: Record<T, string>,
  i18n: Array<i18nType<T>>,
  currentLocale: SupportedLocales,
): Record<T, string> {
  const i18nObject = find(
    i18n,
    translate => translate?.locale === currentLocale,
  );

  return reduce(
    Object.keys(originalValues),
    (acc, property) => {
      const value =
        currentLocale === 'ru'
          ? originalValues[property]
          : i18nObject?.[property];

      return {...acc, [property]: value || ''};
    },
    {} as Record<T, string>,
  );
}

const objectCompletnessInfo = (
  object: ListMobileDataQueryObject | null,
  objectRootCategory: ITransformedCategory | null,
) => {
  const imcompletedFieldsNames = filter(
    objectRootCategory?.completenessFields,
    fieldName => {
      const value = object?.[fieldName];

      return isEmpty(value) || value?.items ? isEmpty(value?.items) : false;
    },
  ) as ObjectField[];

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

export function prepareObjectAdditionalInfoItems(
  items: Array<AccommodationPlaceItem | DinnerPlacesItem | UpcomingEventsItem>,
  currentLocale: SupportedLocales,
): IObjectAddititonalInfoItem[] {
  return reduce(
    items,
    (acc, item) => {
      const translatedProperties = getTranslationsForProperties(
        {name: item.name},
        item.i18n,
        currentLocale,
      );

      const placeItem = item as AccommodationPlaceItem | DinnerPlacesItem;
      const eventItem = item as UpcomingEventsItem;

      if (eventItem.date && isDateInThePast(eventItem.date)) {
        return acc;
      }

      acc.push({
        name: translatedProperties.name,
        date: eventItem.date
          ? dateToReadableString(eventItem.date, currentLocale)
          : '',
        link: placeItem.messengerLink || eventItem.link,
        googleLink: placeItem.googleMapLink,
      });

      return acc;
    },
    [] as IObjectAddititonalInfoItem[],
  );
}

export function prepareObjectInclude(
  objectIds: Array<string | null> | null | undefined,
  objectItems: Array<ListMobileDataQueryObject | null> | null,
  categoriesMap: ICategoriesMap,
): IInclude[] {
  return reduce(
    objectIds,
    (relatedAcc, objectId) => {
      if (objectId) {
        const objectCategoryId = find(objectItems, {id: objectId})?.categoryId;
        if (objectCategoryId) {
          const categoryData = categoriesMap[objectCategoryId];

          if (
            some(relatedAcc, ({categoryId}) => categoryId === objectCategoryId)
          ) {
            return map(relatedAcc, item => {
              return item.categoryId === objectCategoryId
                ? {
                    ...item,
                    objects: [...item.objects, objectId],
                  }
                : item;
            });
          } else if (categoryData) {
            relatedAcc.push({
              categoryId: categoryData.id,
              image: categoryData.cover || '',
              name: categoryData.name,
              objects: [objectId],
            });
          }
        }
      }
      return relatedAcc;
    },
    [] as IInclude[],
  );
}

export function prepareObjectBelongsTo(
  objectIds: Array<string | null> | null | undefined,
  objectItems: Array<ListMobileDataQueryObject | null> | null,
  categoriesMap: ICategoriesMap,
  currentLocale: SupportedLocales,
): IBelongsTo[] {
  return reduce(
    objectIds,
    (relatedAcc, objectId) => {
      if (objectId) {
        const object = find(objectItems, {id: objectId});
        if (object) {
          const {categoryId, id, cover} = object;
          const {name} = getTranslationsForProperties(
            {name: object.name, description: object.description || ''},
            object.i18n,
            currentLocale,
          );

          const categoryData = categoriesMap[categoryId];

          if (categoryData) {
            relatedAcc.push({
              objectId: id,
              image: cover ? imagesService.getOriginalImage(cover) : '',
              name: name,
              categoryName: categoryData.name,
            });
          }
        }
      }
      return relatedAcc;
    },
    [] as IBelongsTo[],
  );
}

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
          const {name, description} = getTranslationsForProperties(
            {name: object.name, description: object.description || ''},
            object.i18n,
            currentLocale,
          );

          objectsToCategoryMap[object.id] = object.categoryId;

          const objectCategory = categoriesMap[object.categoryId];

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

            include: prepareObjectInclude(
              object.include,
              objects?.items || [],
              categoriesMap,
            ),
            belongsTo: prepareObjectBelongsTo(
              object.belongsTo,
              objects?.items || [],
              categoriesMap,
              currentLocale,
            ),
            url: object.url || undefined,
            routes: (object.routes as LineString) || undefined,
            length: object.length || null,
            origins: (object.origins as IOrigins[]) || null,
            phoneNumber: object.phoneNumber?.[0] || null,
            workingHours: object.workingHours || undefined,
            attendanceTime:
              object.calculatedProperties?.averageSpentTime ||
              object.attendanceTime ||
              null,

            usersRating:
              object.calculatedProperties?.averageRating &&
              object.calculatedProperties?.totalRatings > 2
                ? object.calculatedProperties?.averageRating
                : null,
            usersRatingsTotal:
              object.calculatedProperties?.totalRatings || null,
            googleRating: object.googleRating || null,
            googleRatingsTotal: object.googleRatingsTotal || null,
            renting: map(object.renting.items, item => {
              const translatedProperties = getTranslationsForProperties(
                {name: item.renting.name},
                item.renting.i18n,
                currentLocale,
              );

              return translatedProperties.name;
            }),
            childServices: map(object.childServices?.items, item => {
              const translatedProperties = getTranslationsForProperties(
                {name: item.childService.name},
                item.childService.i18n,
                currentLocale,
              );

              return translatedProperties.name;
            }),
            upcomingEvents: prepareObjectAdditionalInfoItems(
              object.upcomingEvents.items,
              currentLocale,
            ),
            accommodationPlace: prepareObjectAdditionalInfoItems(
              object.accommodationPlace.items,
              currentLocale,
            ),
            dinnerPlaces: prepareObjectAdditionalInfoItems(
              object.dinnerPlaces.items,
              currentLocale,
            ),
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
