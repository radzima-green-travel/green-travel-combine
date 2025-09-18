import {
  Highlight,
  SearchObject,
  SearchObjectDTO,
  SupportedLocales,
  SearchOptions,
  SearchFilters,
  SearchFiltersItem,
  SpotItem,
  CategoryFilterItem,
  TranslatedSearchObject,
} from 'core/types';
import {
  map,
  find,
  mapValues,
  every,
  isEmpty,
  omit,
  forEach,
  keys,
  isEqual,
  isArray,
} from 'lodash';
import {
  extractLocaleSpecificValues,
  translateAndProcessImagesForEntity,
  prepareObjectAddressSpots,
  getAddressStringFromSpots,
  getUserRatingValue,
} from './common';
import i18n from 'i18next';

export function extractValueFromHighlight(
  object: TranslatedSearchObject,
  highlight: Highlight | null,
) {
  return (key: string) => find(highlight?.[key], {id: object.id})?.value;
}

export function prepareSearchObjectAddress(
  object: TranslatedSearchObject,
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
  const preparedItems = map(searchObjects, object => {
    const processedObject = {
      ...translateAndProcessImagesForEntity(object, locale),
      category: extractLocaleSpecificValues(object.category, locale),
    };

    if (query) {
      const highlightForValue = extractValueFromHighlight(
        processedObject,
        highlight,
      );

      const {averageRating, totalRatings} =
        processedObject.calculatedProperties ?? {};

      return {
        ...omit(processedObject, ['addresses']),
        highlight: {
          name: highlightForValue('name'),
          description: highlightForValue('description_plain'),
          address: prepareSearchObjectAddress(
            processedObject,
            highlight,
            locale,
          ),
        },
        usersRating: getUserRatingValue(averageRating, totalRatings),
      };
    }

    return processedObject;
  }) as SearchObject[];

  return preparedItems;
}

export function transformSearchOptionsToFieldsToSearch(options: SearchOptions) {
  return {
    fieldsToSearch: {
      isSpotIncluded: options.byAddress,
      isDescriptionIncluded: options.byDescription,
    },
  };
}

export const prepareSearchFiltersBarItems = ({
  filters,
  isAuthorized,
  regions,
  categories,
  settlements,
}: {
  filters: SearchFilters;
  isAuthorized: boolean;
  regions: SpotItem[];
  categories: CategoryFilterItem[];
  settlements: SpotItem[];
}): Array<SearchFiltersItem> => {
  const filtersItems: Array<SearchFiltersItem> = [];
  const filtersKeys = keys(filters) as Array<keyof SearchFilters>;

  function getFilterValue(filterName: keyof SearchFilters, filterId: string) {
    if (filterName === 'categories') {
      return find(categories, {id: filterId})?.name || '';
    }

    if (filterName === 'regions') {
      return find(regions, {id: filterId})?.value || '';
    }

    return find(settlements, {id: filterId})?.value || '';
  }

  forEach(filtersKeys, key => {
    if (key === 'objectIds') {
      return;
    }

    if (Array.isArray(filters[key])) {
      const filter = filters[key] as string[];
      if (filter.length) {
        let translationsKey = '';
        let value = '';
        if (filter.length === 1) {
          value = getFilterValue(key, filter[0]);
        } else {
          translationsKey = `search:filters.${key}Plural${filter.length <= 4 ? '' : 'Variation'}`;
        }

        filtersItems.push({
          id: key,
          value: value || i18n.t(translationsKey, {amount: filter.length}),
        });
      }
    } else if (key === 'distance' && filters[key]?.isOn) {
      filtersItems.push({
        id: key,
        value: i18n.t(`search:filters.${key}`, {
          amount: filters[key]?.value,
        }),
      });
    } else if (
      key === 'excludeVisited' &&
      filters[key] === true &&
      isAuthorized
    ) {
      filtersItems.push({
        id: key,
        value: i18n.t(`search:filters.${key}`),
      });
    } else if (key === 'googleRating' && filters[key]) {
      filtersItems.push({
        id: key,
        icon: 'google',
        value: i18n.t(`search:filters.${key}`, {
          amount: filters[key],
        }),
      });
    }
  });

  return filtersItems;
};

export const checkIfSearchParamsApplied = (
  {
    query,
    filters,
  }: {
    query: string;
    filters?: SearchFilters;
  },
  initialFilters?: SearchFilters,
) => {
  if (query.length > 0) {
    return true;
  }

  if (!filters) {
    return false;
  }

  for (const _ in filters) {
    const key = _ as keyof SearchFilters;

    const value = filters[key];

    const maybeInitialValue = initialFilters?.[key];

    if (
      falsyValues.includes(value) ||
      (maybeInitialValue !== undefined && isEqual(value, maybeInitialValue)) ||
      (isArray(value) && !value.length) ||
      (key === 'distance' && !(value as SearchFilters['distance'])?.isOn)
    ) {
      continue;
    }

    return true;
  }

  return false;
};

const falsyValues: any[] = [null, undefined, '', false];
