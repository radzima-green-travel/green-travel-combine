import {
  CardItem,
  SupportedLocales,
  I18nType,
  ExtractI18nKeys,
  ObjectShort,
  CategoryShort,
} from 'core/types';
import {compact, find, head, keys, map, omit, pick} from 'lodash';
import {imagesService} from 'services/ImagesService';

export function convertShortObjectToCardItem(object: ObjectShort): CardItem {
  return {
    id: object.id,
    cover: object.cover,
    blurhash: object.blurhash,
    name: object.name,
    analyticsMetadata: {
      categoryName: object.category.name,
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
    blurhash: category.blurhash,
    name: category.name,
    analyticsMetadata: {
      categoryName: category.analyticsMetadata.name,
    },
  };
}

type WithPropertiesToSanitize<T extends Record<string, any>> = T & {
  i18n: Array<Partial<I18nType<Extract<keyof T, string>>>>;
  cover?: string;
  images?: Array<string>;
};

export const extractLocaleSpecificValues = <
  T extends WithPropertiesToSanitize<Record<keyof T, any>>,
>(
  entity: T,
  locale: SupportedLocales | null,
) => {
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
    ...entity,
    ...localeSpecificData,
    analyticsMetadata,
  };
};

export const processImagesUrls = <
  T extends WithPropertiesToSanitize<Record<keyof T, any>>,
>(
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
  T extends WithPropertiesToSanitize<Record<keyof T, any>>,
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
