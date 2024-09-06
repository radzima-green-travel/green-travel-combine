import {SpotItemDTO} from 'core/types';
import {reduce, chain, includes, toLower, orderBy, map} from 'lodash';

export function prepareSortedSettlementsSections(settlements: SpotItemDTO[]) {
  return orderBy(settlements, 'value');
}

export function prepareSettlementsSections(
  settlements: SpotItemDTO[],
  regionsToInclude: string[],
  searchValue: string,
) {
  const sections = reduce(
    settlements,
    (acc, item) => {
      if (
        includes(regionsToInclude, item.id) &&
        toLower(item.value).includes(toLower(searchValue))
      ) {
        const firstLetter = item.value[0];

        acc[firstLetter] = [...(acc[firstLetter] || []), item];
      }
      return acc;
    },
    {} as Record<string, SpotItemDTO[]>,
  );

  return chain(sections)
    .pickBy(value => value.length)
    .map((data = [], title) => ({title, data}))
    .value();
}

export function prepareSelectedSettlementsSection(
  settlements: SpotItemDTO[],
  regionsToInclude: string[],
  searchValue: string,
  selectedSettlements: string[],
) {
  const selectedSettlementsSection = [] as SpotItemDTO[];

  map(settlements, item => {
    if (
      includes(regionsToInclude, item.id) &&
      toLower(item.value).includes(toLower(searchValue)) &&
      includes(selectedSettlements, item.id)
    ) {
      selectedSettlementsSection.push(item);
    }
  });

  return selectedSettlementsSection;
}
