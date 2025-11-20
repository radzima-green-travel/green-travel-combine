import { useRoute } from '@react-navigation/native';
import { sendAnalyticsEvent } from 'core/actions';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SettlementsScreenRouteProps } from '../types';
import { SpotItem } from 'core/types';
import { map } from 'lodash';

export function useSettlementsAnalytics() {
  const dispatch = useDispatch();

  const {
    params: {
      analytics: { regionsSelectedNames },
    },
  } = useRoute<SettlementsScreenRouteProps>();
  const sendSettlementsViewEvent = useCallback(() => {
    dispatch(
      sendAnalyticsEvent({
        name: 'Filters_settlements_view',
        data: {
          regions_selected: regionsSelectedNames,
        },
      }),
    );
  }, [dispatch, regionsSelectedNames]);

  const sendSettlementSelectEvent = useCallback(
    (settlementName: string) => {
      dispatch(
        sendAnalyticsEvent({
          name: 'Filters_settlement_select',
          data: { settlement: settlementName },
        }),
      );
    },
    [dispatch],
  );

  const sendSettlementsApplyEvent = useCallback(
    (selectedSettlements: SpotItem[]) => {
      dispatch(
        sendAnalyticsEvent({
          name: 'Filters_settlements_apply',
          data: {
            regions_selected: regionsSelectedNames,
            settlements_selected: map(
              selectedSettlements,
              'analyticsMetadata.value',
            ),
          },
        }),
      );
    },
    [dispatch, regionsSelectedNames],
  );

  const sendSettlementsResetEvent = useCallback(
    (selectedSettlements: SpotItem[]) => {
      dispatch(
        sendAnalyticsEvent({
          name: 'Filters_settlements_reset',
          data: {
            regions_selected: regionsSelectedNames,
            settlements_selected: map(
              selectedSettlements,
              'analyticsMetadata.value',
            ),
          },
        }),
      );
    },
    [dispatch, regionsSelectedNames],
  );

  const sendSettlementsSearchEvent = useCallback(() => {
    dispatch(
      sendAnalyticsEvent({
        name: 'Filters_settlements_search',
      }),
    );
  }, [dispatch]);

  const sendSettlementsSearchClearEvent = useCallback(() => {
    dispatch(
      sendAnalyticsEvent({
        name: 'Filters_settlements_search_clear',
      }),
    );
  }, [dispatch]);

  return {
    sendSettlementSelectEvent,
    sendSettlementsApplyEvent,
    sendSettlementsResetEvent,
    sendSettlementsSearchEvent,
    sendSettlementsViewEvent,
    sendSettlementsSearchClearEvent,
  };
}
