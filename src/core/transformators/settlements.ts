import {SpotItemDTO} from 'core/types';
import {reduce, chain, includes, toLower} from 'lodash';

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
