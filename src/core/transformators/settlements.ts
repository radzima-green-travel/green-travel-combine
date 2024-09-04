import {SpotItemDTO} from 'core/types';
import {reduce, chain, includes, toLower, orderBy} from 'lodash';

export function prepareSettlementsSections(
  settlements: SpotItemDTO[],
  regionsToInclude: string[],
  searchValue: string,
  selectedSettlements: string[],
) {
  const selectedSettlementsSection = [] as SpotItemDTO[];

  const sections = reduce(
    orderBy(settlements, 'value'),
    (acc, item) => {
      if (
        includes(regionsToInclude, item.id) &&
        toLower(item.value).includes(toLower(searchValue))
      ) {
        const firstLetter = item.value[0];

        acc[firstLetter] = [...(acc[firstLetter] || []), item];

        if (includes(selectedSettlements, item.id)) {
          selectedSettlementsSection.push(item);
        }
      }
      return acc;
    },
    {} as Record<string, SpotItemDTO[]>,
  );

  return {
    settlementsSections: chain(sections)
      .pickBy(value => value.length)
      .map((data = [], title) => ({title, data}))
      .value(),
    selectedSettlementsSection,
  };
}
