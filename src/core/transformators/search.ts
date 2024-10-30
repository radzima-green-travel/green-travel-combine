import {
  Highlight,
  SearchObject,
  SearchObjectDTO,
  SupportedLocales,
} from 'core/types';
import {map, find, mapValues, every, isEmpty} from 'lodash';
import {
  extractLocaleSpecificValues,
  translateAndProcessImagesForEntity,
  prepareObjectAddressSpots,
  getAddressStringFromSpots,
} from './common';

export function extractValueFromHighlight(
  object: SearchObject,
  highlight: Highlight | null,
) {
  return (key: string) =>
    find(highlight?.[key], {id: object.id})?.value || object[key];
}

export function prepareSearchObjectAddress(
  object: SearchObject,
  highlight: Highlight | null,
  locale: SupportedLocales | null,
) {
  const translatedSpots = prepareObjectAddressSpots(object.addresses, locale);
  const highlightForValue = extractValueFromHighlight(object, highlight);
  const spotsWithHighlights = mapValues(translatedSpots, (value, key) =>
    highlightForValue('spot_' + key),
  );

  if (every(spotsWithHighlights, isEmpty)) {
    return '';
  }

  return getAddressStringFromSpots(
    mapValues(
      translatedSpots,
      (value, key) => highlightForValue('spot_' + key) || value,
    ),
    locale,
  );
}

export function prepareSearchItems(
  searchObjects: SearchObjectDTO[],
  highlight: Highlight | null,
  query: string,
  locale: SupportedLocales | null,
): SearchObject[] {
  return map(searchObjects, object => {
    const processedObject = {
      ...translateAndProcessImagesForEntity(object, locale),
      category: extractLocaleSpecificValues(object.category, locale),
    };

    if (query) {
      const highlightForValue = extractValueFromHighlight(
        processedObject,
        highlight,
      );

      return {
        ...processedObject,
        name: highlightForValue('name'),
        description: highlightForValue('description'),
        address: prepareSearchObjectAddress(processedObject, highlight, locale),
      };
    }

    return processedObject;
  });
}
