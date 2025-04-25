import {sendAnalyticsEvent} from 'core/actions';
import {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {RouteQueryParams, SpotItem} from 'core/types';
import {map, split} from 'lodash';
import {useLocalSearchParams} from 'expo-router';

export function useSettlementsAnalytics() {
  const dispatch = useDispatch();

  const searchParams = useLocalSearchParams<RouteQueryParams.Settlements>();

  const {regionsSelectedNames} = useMemo(
    () => ({
      regionsSelectedNames: split(searchParams.regionsSelectedNames, ','),
    }),
    [searchParams.regionsSelectedNames],
  );

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
          data: {settlement: settlementName},
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
