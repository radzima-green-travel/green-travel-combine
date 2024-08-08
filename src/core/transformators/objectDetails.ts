import {
  AccommodationPlaceItemDTO,
  BelongsToItemDTO,
  DinnerPlacesItemDTO,
  IBelongsTo,
  IInclude,
  IncludeItemDTO,
  IObject,
  IObjectAdditionalInfoItem,
  ObjectDetailsResponseDTO,
  SupportedLocales,
  UpcomingEventsItemDTO,
} from 'core/types';
import {filter, isEmpty, map, reduce} from 'lodash';
import {ObjectField} from 'core/constants';
import {dateToReadableString, isDateInThePast} from 'core/helpers';
import {
  extractLocaleSpecificValues,
  getObjectFullAddress,
  processImagesUrls,
  translateAndProcessImagesForEntity,
} from './common';

const isValueOrItemsEmpty = (value: any): boolean => {
  return isEmpty(value) || value?.items ? isEmpty(value?.items) : false;
};

function objectCompletenessInfo(
  object: ObjectDetailsResponseDTO | null,
  completenessFields: ObjectField[],
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
  items: Array<
    AccommodationPlaceItemDTO | DinnerPlacesItemDTO | UpcomingEventsItemDTO
  >,
  currentLocale: SupportedLocales | null,
): IObjectAdditionalInfoItem[] {
  return reduce(
    items,
    (acc, item) => {
      const {name} = extractLocaleSpecificValues(item, currentLocale);

      const placeItem = item as AccommodationPlaceItemDTO | DinnerPlacesItemDTO;
      const eventItem = item as UpcomingEventsItemDTO;

      if (eventItem.date && isDateInThePast(eventItem.date)) {
        return acc;
      }

      acc.push({
        name,
        date:
          eventItem.date && currentLocale
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
  includeItems: IncludeItemDTO[],
  currentLocale: SupportedLocales | null,
): IInclude[] {
  return includeItems.reduce((acc, item) => {
    const {
      include: {category, id},
    } = item;

    const {
      id: categoryId,
      name,
      cover,
    } = translateAndProcessImagesForEntity(category, currentLocale);

    return [
      ...acc,
      {
        categoryId,
        name,
        image: cover,
        objects: [id],
        analyticsMetadata: {
          name,
        },
      },
    ];
  }, [] as IInclude[]);
}

export function prepareObjectBelongsTo(
  belongsToItems: BelongsToItemDTO[],
  currentLocale: SupportedLocales | null,
): IBelongsTo[] {
  if (belongsToItems.length === 0) {
    return [];
  }

  return belongsToItems.reduce((acc, item) => {
    const {belongsTo} = item;

    const {
      id: objectId,
      name,
      cover,
    } = translateAndProcessImagesForEntity(belongsTo, currentLocale);

    const {name: categoryName} = extractLocaleSpecificValues(
      belongsTo.category,
      currentLocale,
    );

    return [
      ...acc,
      {
        objectId,
        name,
        categoryName,
        image: cover,
        analyticsMetadata: {
          name,
          categoryName,
        },
      },
    ];
  }, [] as IBelongsTo[]);
}

export const prepareObjectDetails = (
  object: ObjectDetailsResponseDTO | null,
  currentLocale: SupportedLocales | null,
): IObject | null => {
  if (!object) {
    return null;
  }

  const {
    addresses,
    area,
    attendanceTime,
    accommodationPlace,
    belongsTo,
    calculatedProperties,
    category,
    childServices,
    description,
    googleRating,
    googleRatingsTotal,
    dinnerPlaces,
    i18n,
    id,
    images,
    include,
    length,
    location,
    name,
    origins,
    phoneNumber,
    renting,
    routes,
    workingHours,
    upcomingEvents,
    url,
  } = object;

  const {averageSpentTime, averageRating, totalRatings} =
    calculatedProperties ?? {
      averageSpentTime: null,
      averageRating: null,
      totalRatings: null,
    };

  const {name: translatedName, description: translatedDescription} =
    extractLocaleSpecificValues({name, description, i18n}, currentLocale);

  const translatedAddress = getObjectFullAddress(addresses, currentLocale);

  const {percentageOfCompletion, incompleteFieldsNames} =
    objectCompletenessInfo(object, category.completenessFields);

  const {images: convertedImages} = processImagesUrls({i18n, images});

  return {
    id,
    name: translatedName,
    description: translatedDescription,
    address: translatedAddress,
    area,
    location,
    category: {
      ...category,
      incompleteFieldsNames: incompleteFieldsNames,
      percentageOfCompletion: percentageOfCompletion,
    },
    images: convertedImages,
    include: prepareObjectInclude(include.items ?? [], currentLocale),
    belongsTo: prepareObjectBelongsTo(belongsTo.items ?? [], currentLocale),
    url,
    routes,
    length,
    origins,
    phoneNumbers: phoneNumber,
    workingHours,
    attendanceTime: averageSpentTime || attendanceTime || null,
    usersRating:
      averageRating && totalRatings && totalRatings > 1 ? averageRating : null,
    usersRatingsTotal: totalRatings,
    googleRating,
    googleRatingsTotal,
    renting: map(renting.items, ({renting: rentingService}) => {
      const {name: rentingServiceName} = extractLocaleSpecificValues(
        rentingService,
        currentLocale,
      );

      return rentingServiceName;
    }),
    childServices: map(childServices.items, ({childService}) => {
      const {name: childServiceName} = extractLocaleSpecificValues(
        childService,
        currentLocale,
      );

      return childServiceName;
    }),
    upcomingEvents: prepareObjectAdditionalInfoItems(
      upcomingEvents.items,
      currentLocale,
    ),
    accommodationPlace: prepareObjectAdditionalInfoItems(
      accommodationPlace.items,
      currentLocale,
    ),
    dinnerPlaces: prepareObjectAdditionalInfoItems(
      dinnerPlaces.items,
      currentLocale,
    ),
    analyticsMetadata: {
      name,
      categoryName: category.name,
    },
  };
};
