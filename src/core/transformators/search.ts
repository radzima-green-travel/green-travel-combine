import {
  HighlightDTO,
  SearchObject,
  SearchObjectDTO,
  SupportedLocales,
} from 'core/types';
import {map, find} from 'lodash';
import {
  extractLocaleSpecificValues,
  translateAndProcessImagesForEntity,
} from './common';

export function extractValueFromHighlight(
  object: SearchObject,
  highlight: Record<string, HighlightDTO[]> | null,
) {
  return (key: string) =>
    find(highlight?.[key], {id: object.id})?.value || object[key];
}

export function prepareSearchItems(
  searchObjects: SearchObjectDTO[],
  highlight: Record<string, HighlightDTO[]> | null,
  locale: SupportedLocales | null,
): SearchObject[] {
  return map(searchObjects, object => {
    const processedObject = {
      ...translateAndProcessImagesForEntity(object, locale),
      category: extractLocaleSpecificValues(object.category, locale),
    };

    const highlightForValue = extractValueFromHighlight(
      processedObject,
      highlight,
    );

    return {
      ...processedObject,
      name: highlightForValue('name'),
      description: highlightForValue('description'),
    };
  });
}
