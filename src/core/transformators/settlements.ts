import {SpotItemDTO} from 'core/types';
import {reduce, chain} from 'lodash';

export function prepareFiltersSettlements(
  settlements: SpotItemDTO[],
  settlementsWithNumberOfItems?: Record<string, number>,
) {
  const sections = reduce(
    settlements,
    (acc, item) => {
      const firstLetter = item.value[0];
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      if (
        settlementsWithNumberOfItems?.[item.id] ||
        !settlementsWithNumberOfItems
      ) {
        acc[firstLetter].push(item);
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
