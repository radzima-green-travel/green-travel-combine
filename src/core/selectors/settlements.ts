import {createSelector} from '@reduxjs/toolkit';
import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';
import {prepareSettlementsSections} from 'core/transformators/settlements';
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

export const selectSettlementsSections = createSelector(
  selectSettlements,
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
