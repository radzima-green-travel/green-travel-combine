import {createSelector} from '@reduxjs/toolkit';
import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';
import {
  prepareSettlementsSections,
  prepareSelectedSettlementsSection,
  prepareSortedSettlementsSections,
} from 'core/transformators/settlements';
import {extractLocaleSpecificValues} from 'core/transformators/common';
import {map} from 'lodash';

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

export const selectSortedSelectSettlements = createSelector(
  selectSettlements,
  settlements => prepareSortedSettlementsSections(settlements),
);

export const selectSettlementsSections = createSelector(
  selectSortedSelectSettlements,
  (_: IState, regionsToInclude: string[]) => regionsToInclude,
  (_: IState, _1: string[], searchValue: string) => searchValue,
  (settlements, regionsToInclude, searchValue) => {
    return prepareSettlementsSections(
      settlements,
      regionsToInclude,
      searchValue,
    );
  },
);

export const selectSelectedSettlementsSection = createSelector(
  selectSortedSelectSettlements,
  (_: IState, regionsToInclude: string[]) => regionsToInclude,
  (_: IState, _1: string[], searchValue: string) => searchValue,
  (_: IState, _1: string[], _2: string, selectedSettlements: string[]) =>
    selectedSettlements,
  (settlements, regionsToInclude, searchValue, selectedSettlements) => {
    return prepareSelectedSettlementsSection(
      settlements,
      regionsToInclude,
      searchValue,
      selectedSettlements,
    );
  },
);
