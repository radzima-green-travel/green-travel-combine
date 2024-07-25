import {
  AccommodationPlaceItem,
  BelongsToItem,
  DinnerPlacesItem,
  i18nType,
  IncludeItem,
  ListMobileDataQueryObject,
  UpcomingEventsItem,
} from 'api/graphql/types';
import {
  IBelongsTo,
  IInclude,
  IObject,
  IObjectAdditionalInfoItem,
  IOrigins,
  SpotI18n,
  SupportedLocales,
} from 'core/types';
import {compact, filter, find, isEmpty, map, reduce} from 'lodash';
import {imagesService} from 'services/ImagesService';
import transliterate from './transliterate';
import {ObjectField} from 'core/constants';
import {LineString, MultiPolygon} from 'geojson';
import {dateToReadableString, isDateInThePast} from './date';

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

const isValueOrItemsEmpty = (value: any): boolean => {
  return isEmpty(value) || value?.items ? isEmpty(value?.items) : false;
};

function objectCompletenessInfo(
  object: ListMobileDataQueryObject | null,
  completenessFields?: string[] | null,
) {
  const incompleteFieldsNames = filter(completenessFields, fieldName => {
    const value = object?.[fieldName];
    const isValueEmpty = isValueOrItemsEmpty(value);

    if (fieldName === ObjectField.attendanceTime && isValueEmpty) {
      return !object?.calculatedProperties?.averageSpentTime;
    }

    return isValueEmpty;
  }) as ObjectField[];

  const amountOfIncompleteFields = incompleteFieldsNames.length;
  const amountOfCompletenessFields = completenessFields?.length || 0;
  const percentageOfCompletion =
    amountOfCompletenessFields &&
    amountOfCompletenessFields >= amountOfIncompleteFields
      ? Math.round(
          (1 - amountOfIncompleteFields / amountOfCompletenessFields) * 100,
        )
      : 0;

  return {
    incompleteFieldsNames,
    percentageOfCompletion,
  };
}

export function prepareObjectAdditionalInfoItems(
  items: Array<AccommodationPlaceItem | DinnerPlacesItem | UpcomingEventsItem>,
  currentLocale: SupportedLocales,
): IObjectAdditionalInfoItem[] {
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
    [] as IObjectAdditionalInfoItem[],
  );
}

export function prepareObjectInclude(
  includeItems: IncludeItem[],
  currentLocale: SupportedLocales,
): IInclude[] {
  return includeItems.reduce((acc, item) => {
    const {
      include: {
        category: {cover, id, name, i18n},
        id: objectId,
      },
    } = item;

    const {name: categoryName} = getTranslationsForProperties(
      {name: name},
      i18n,
      currentLocale,
    );

    return [
      ...acc,
      {
        categoryId: id,
        name: categoryName,
        image: imagesService.getOriginalImage(cover),
        objects: [objectId, objectId],
        analyticsMetadata: {
          name: categoryName,
        },
      },
    ];
  }, [] as IInclude[]);
}

export function prepareObjectBelongsTo(
  belongsToItems: BelongsToItem[],
  currentLocale: SupportedLocales,
): IBelongsTo[] {
  if (belongsToItems.length === 0) {
    return [];
  }

  return belongsToItems.reduce((acc, item) => {
    const {belongsTo} = item;

    const {name} = getTranslationsForProperties(
      {name: belongsTo.name},
      belongsTo.i18n,
      currentLocale,
    );

    const {name: categoryName} = getTranslationsForProperties(
      {name: belongsTo.category.name},
      belongsTo.category.i18n,
      currentLocale,
    );

    return [
      ...acc,
      {
        objectId: belongsTo.id,
        name,
        categoryName,
        image: imagesService.getOriginalImage(belongsTo.cover),
        analyticsMetadata: {
          name,
          categoryName,
        },
      },
    ];
  }, [] as IBelongsTo[]);
}

export const transformObjectDetails = (
  object: ListMobileDataQueryObject,
  currentLocale: SupportedLocales,
): IObject => {
  const {name, description} = getTranslationsForProperties(
    {name: object.name, description: object.description || ''},
    object.i18n,
    currentLocale,
  );

  function getObjectAddress(): string {
    const address: string[] = [];
    const [{region, subRegion, municipality, street = ''}] =
      object?.addresses?.items ?? [];

    [region, subRegion, municipality].forEach(item => {
      if (item) {
        const spotName = getSpotTranslation(item, currentLocale);

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

  const {percentageOfCompletion, incompleteFieldsNames} =
    objectCompletenessInfo(object, object?.category?.completenessFields);

  return {
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
      icon: object?.category?.icon || '',
      id: object?.category?.id || '',
      name: object?.category?.name || '',
      parent: object?.category?.parent || null,
      singularName: object?.category?.singularName || '',
      incompleteFieldsNames: incompleteFieldsNames,
      percentageOfCompletion: percentageOfCompletion,
    },
    cover: object.cover ? imagesService.getOriginalImage(object.cover) : '',
    blurhash: object.blurhash || '',
    images: compact(
      map(object.images, img =>
        img ? imagesService.getOriginalImage(img) : img,
      ),
    ),

    // include: prepareObjectInclude(object.include.items, currentLocale),
    // belongsTo: prepareObjectBelongsTo(
    //   object?.belongsTo?.items ?? [],
    //   currentLocale,
    // ),
    include: [],
    belongsTo: [],
    url: object.url || undefined,
    routes: (object.routes as LineString) || undefined,
    length: object.length || null,
    origins: (object.origins as IOrigins[]) || null,
    phoneNumbers: object.phoneNumber,
    workingHours: object.workingHours || undefined,
    attendanceTime:
      object.calculatedProperties?.averageSpentTime ||
      object.attendanceTime ||
      null,

    usersRating:
      object.calculatedProperties?.averageRating &&
      object.calculatedProperties?.totalRatings > 1
        ? object.calculatedProperties?.averageRating
        : null,
    usersRatingsTotal: object.calculatedProperties?.totalRatings || null,
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
    analyticsMetadata: {
      name: object.name,
      categoryName: object?.category?.name || '',
    },
  };
};
