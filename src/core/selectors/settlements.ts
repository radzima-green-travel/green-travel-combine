import {createSelector} from '@reduxjs/toolkit';
import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';
import {
  prepareSettlementsSections,
  prepareSelectedSettlementsSection,
  prepareFilteredSettlementsSections,
} from 'core/transformators/settlements';
import {extractLocaleSpecificValues} from 'core/transformators/common';
import {map} from 'lodash';
import {SpotItemDTO} from 'core/types';

export const selectSettlementsData = (state: IState) => {
  return state.settlements.settlementsData;
};

export const selectSettlements = createSelector(
  selectSettlementsData,
  selectAppLanguage,
  ({data}, locale) => {
    return map(data, settlement =>
      extractLocaleSpecificValues(settlement, locale),
    );
  },
);

export const selectIsSettlementsLoaded = createSelector(
  selectSettlements,
  settlements => Boolean(settlements.length),
);

export const selectFilteredSettlements = createSelector(
  selectSettlements,
  (_: IState, regionsToInclude: string[]) => regionsToInclude,
  (_: IState, _1: string[], searchValue: string) => searchValue,
  (settlements, regionsToInclude, searchValue) => {
    return prepareFilteredSettlementsSections(
      settlements,
      regionsToInclude,
      searchValue,
    );
  },
);

export const selectSettlementsSections = createSelector(
  (settlements: SpotItemDTO[]) => settlements,
  settlements => {
    return prepareSettlementsSections(settlements);
  },
);

export const selectSelectedSettlementsSection = createSelector(
  (settlements: SpotItemDTO[]) => settlements,
  (_: SpotItemDTO[], selectedSettlements: string[]) => selectedSettlements,
  (settlements, selectedSettlements) => {
    return prepareSelectedSettlementsSection(settlements, selectedSettlements);
  },
);
