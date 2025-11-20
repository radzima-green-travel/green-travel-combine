import { SpotItem } from 'core/types';
import { reduce, chain, includes, toLower, orderBy, filter } from 'lodash';

export function prepareFilteredSettlementsSections(
  settlements: SpotItem[],
  regionsToInclude: string[],
  searchValue: string,
) {
  return filter(
    orderBy(settlements, 'value'),
    item =>
      includes(regionsToInclude, item.id)
      && toLower(item.value).includes(toLower(searchValue)),
  );
}

export function prepareSettlementsSections(settlements: SpotItem[]) {
  const sections = reduce(
    settlements,
    (acc, item) => {
      const firstLetter = item.value[0];
      acc[firstLetter] = [...(acc[firstLetter] || []), item];
      return acc;
    },
    {} as Record<string, SpotItem[]>,
  );

  return chain(sections)
    .pickBy(value => value.length)
    .map((data = [], title) => ({ title, data }))
    .value();
}

export function prepareSelectedSettlementsSection(
  settlements: SpotItem[],
  selectedSettlements: string[],
) {
  return filter(settlements, item => includes(selectedSettlements, item.id));
}
