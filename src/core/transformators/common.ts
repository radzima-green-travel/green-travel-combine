import transliterate from 'core/helpers/transliterate';
import {
  CardItem,
  SupportedLocales,
  I18nType,
  ExtractI18nKeys,
  ObjectShort,
  CategoryShort,
  AddressessDTO,
  TranslatedEntity,
  PlaceOfTheWeekObject,
} from 'core/types';
import {compact, find, head, keys, map, omit, pick} from 'lodash';
import {imagesService} from 'services/ImagesService';

export function convertShortObjectToCardItem(object: ObjectShort): CardItem {
  return {
    id: object.id,
    cover: object.cover,
    blurhash: object.blurhash || '',
    name: object.name,
    analyticsMetadata: {
      categoryName: object.category.name,
      objectName: object.analyticsMetadata.name,
    },
  };
}

export const getUserRatingValue = (
  averageRating: number | null | undefined,
  totalRatings: number | null | undefined,
) => {
  return averageRating && totalRatings && totalRatings > 1
    ? averageRating
    : null;
};

export function convertPlaceOfTheWeekObjectToCardItem(
  object: PlaceOfTheWeekObject,
): CardItem {
  const {googleRating, calculatedProperties} = object;
  const {averageRating, totalRatings} = calculatedProperties || {};

  return {
    id: object.id,
    cover: object.cover,
    blurhash: object.blurhash || '',
    name: object.name,
    categoryName: object.category.name,
    usersRating: getUserRatingValue(averageRating, totalRatings),
    usersRatingsTotal: totalRatings || null,
    googleRating,
    analyticsMetadata: {
      categoryName: object.category.analyticsMetadata.name,
      objectName: object.analyticsMetadata.name,
    },
  };
}

export function convertShortCategoryToCardItem(
  category: CategoryShort,
): CardItem {
  return {
    id: category.id,
    cover: category.cover,
    blurhash: category.blurhash || '',
    name: category.name,
    analyticsMetadata: {
      categoryName: category.analyticsMetadata.name,
    },
  };
}

type ImagesPropertyToProcess = {
  cover?: string;
  images?: string[];
};

type WithPropertiesToSanitize<T extends Record<string, any>> = T & {
  i18n: Partial<I18nType<Extract<keyof T, string>>>[];
} & ImagesPropertyToProcess;

export const extractLocaleSpecificValues = <
  T extends WithPropertiesToSanitize<Record<keyof T, any>>,
>(
  entity: T,
  locale: SupportedLocales | null,
): TranslatedEntity<T> => {
  const firstLocaleSpecificData = omit(head(entity.i18n), ['locale']);
  const keysToTranslate = keys(firstLocaleSpecificData);

  const localeSpecificData = omit(
    find(entity.i18n, data => data.locale === locale),
    ['locale'],
  );

  const analyticsMetadata = pick(entity, keysToTranslate) as unknown as Record<
    ExtractI18nKeys<T>,
    string
  >;

  return {
    ...omit(entity, 'i18n'),
    ...localeSpecificData,
    analyticsMetadata,
  };
};

export const processImagesUrls = <T extends ImagesPropertyToProcess>(
  entity: T,
) => {
  return {
    ...entity,
    cover: entity.cover
      ? imagesService.getOriginalImage(entity.cover)
      : entity.cover,
    images: entity.images
      ? compact(map(entity.images, img => imagesService.getOriginalImage(img)))
      : entity.images,
  };
};

export const translateAndProcessImagesForEntity = <
  T extends WithPropertiesToSanitize<Partial<Record<keyof T, any>>>,
>(
  entity: T,
  locale: SupportedLocales | null,
) => {
  const entityWithEtxtractedLocaleData = extractLocaleSpecificValues(
    entity,
    locale,
  );

  return processImagesUrls(entityWithEtxtractedLocaleData);
};

export const prepareObjectAddressSpots = (
  addresses: AddressessDTO,
  locale: SupportedLocales | null,
) => {
  const {
    region,
    municipality,
    subRegion,
    street = '',
  } = addresses.items[0] || {};

  return {
    region: region ? extractLocaleSpecificValues(region, locale).value : '',
    municipality: municipality
      ? extractLocaleSpecificValues(municipality, locale).value
      : '',
    subRegion: subRegion
      ? extractLocaleSpecificValues(subRegion, locale).value
      : '',
    street,
  };
};

export function getAddressStringFromSpots({
  spots,
  locale,
  order = 'primary',
}: {
  spots: {
    region: string;
    municipality: string;
    subRegion: string;
    street: string;
  };
  locale: SupportedLocales | null;
  order?: 'primary' | 'secondary';
}) {
  const {region, municipality, subRegion, street} = spots;

  let translatedStreet = '';
  if (street) {
    translatedStreet = locale === 'ru' ? street : transliterate(street);
  }

  const translatedSpots = compact(
    order === 'primary'
      ? [region, subRegion, municipality, translatedStreet]
      : [municipality, translatedStreet, region, subRegion],
  );
  return translatedSpots.join(', ');
}

export const getObjectFullAddress = (
  addresses: AddressessDTO,
  locale: SupportedLocales | null,
) => {
  const translatedSpots = prepareObjectAddressSpots(addresses, locale);

  return getAddressStringFromSpots({spots: translatedSpots, locale});
};
