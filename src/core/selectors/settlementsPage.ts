import {createSelector} from '@reduxjs/toolkit';
import {IState} from 'core/store';
import {selectAppLanguage} from './settingsSelectors';
import {prepareSettlementsSections} from 'core/transformators/settlements';
import {extractLocaleSpecificValues} from 'core/transformators/common';
import {map} from 'lodash';

export const selectSettlementsData = (state: IState) =>
  state.settlements.settlementsData;

export const selectSettlements = createSelector(
  selectSettlementsData,
  selectAppLanguage,
  ({data}, locale) => {
    return map(data, settlement =>
      extractLocaleSpecificValues(settlement, locale),
    );
  },
);

export const selectSettlementsSections = (
  settlementsWithNumberOfItems?: Record<string, number>,
) =>
  createSelector(selectSettlements, settlements => {
    return prepareSettlementsSections(
      settlements,
      settlementsWithNumberOfItems,
    );
  });
