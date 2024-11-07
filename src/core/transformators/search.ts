import {
  Highlight,
  SearchObject,
  SearchObjectDTO,
  SupportedLocales,
  SearchOptions,
} from 'core/types';
import {map, find, mapValues, every, isEmpty, omit} from 'lodash';
import {
  extractLocaleSpecificValues,
  translateAndProcessImagesForEntity,
  prepareObjectAddressSpots,
  getAddressStringFromSpots,
} from './common';

export function extractValueFromHighlight(
  object: SearchObjectDTO,
  highlight: Highlight | null,
) {
  return (key: string) =>
    find(highlight?.[key], {id: object.id})?.value || object[key];
}

export function prepareSearchObjectAddress(
  object: SearchObjectDTO,
  highlight: Highlight | null,
  locale: SupportedLocales | null,
) {
  const translatedSpots = prepareObjectAddressSpots(object.addresses, locale);
  const highlightForValue = extractValueFromHighlight(object, highlight);
  const spotsWithHighlights = mapValues(translatedSpots, (value, key) =>
    highlightForValue('spot_' + key),
  );

  const isFoundStreetOrMunicipality =
    spotsWithHighlights.street || spotsWithHighlights.municipality;
  const isFoundInRegionOrSubRegion =
    spotsWithHighlights.region || spotsWithHighlights.subRegion;

  if (every(spotsWithHighlights, isEmpty)) {
    return '';
  }

  return getAddressStringFromSpots({
    spots: mapValues(
      translatedSpots,
      (value, key) => highlightForValue('spot_' + key) || value,
    ),
    locale,
    order:
      isFoundStreetOrMunicipality && !isFoundInRegionOrSubRegion
        ? 'secondary'
        : 'primary',
  });
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
      const highlightForValue = extractValueFromHighlight(object, highlight);

      return {
        ...omit(processedObject, ['addresses']),
        highlight: {
          name: highlightForValue('name'),
          description: highlightForValue('description'),
          address: prepareSearchObjectAddress(object, highlight, locale),
        },
      };
    }

    return processedObject;
  });
}

export function transformSearchOptionsToFieldsToSearch(options: SearchOptions) {
  return {
    fieldsToSearch: {
      isSpotIncluded: options.byAddress,
      isDescriptionIncluded: options.byDescription,
    },
  };
}
