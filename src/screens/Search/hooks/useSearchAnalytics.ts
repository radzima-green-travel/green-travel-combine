import {sendAnalyticsEvent} from 'core/actions';
import {useSearchSelector} from 'core/hooks';
import {selectSearchHistory, selectSearchOptions} from 'core/selectors';
import {SearchOptions} from 'core/types';
import {compact, find} from 'lodash';
import {useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useSearchAnalytics() {
  const dispatch = useDispatch();

  const historyObjects = useSelector(selectSearchHistory);
  const ignoreCloseEvent = useRef(false);
  const searchOptions = useSearchSelector(selectSearchOptions);

  const sendSearchViewEvent = useCallback(() => {
    dispatch(
      sendAnalyticsEvent({
        name: 'Search_view',
      }),
    );
  }, [dispatch]);

  const sendSearchParametersViewEvent = useCallback(() => {
    ignoreCloseEvent.current = false;

    dispatch(
      sendAnalyticsEvent({
        name: 'Search_parameters_view',
      }),
    );
  }, [dispatch]);

  const sendSearchParameterOnEvent = useCallback(
    (options: SearchOptions) => {
      ignoreCloseEvent.current = true;

      dispatch(
        sendAnalyticsEvent({
          name: 'Search_parameter_on',
          data: {
            parameters: compact([
              options.byAddress && 'Address',
              options.byDescription && 'Description',
            ]),
          },
        }),
      );
    },
    [dispatch],
  );

  const sendSearchParametersCloseEvent = useCallback(() => {
    if (!ignoreCloseEvent.current) {
      dispatch(
        sendAnalyticsEvent({
          name: 'Search_parameters_close',
          data: {
            parameters: compact([
              searchOptions.byAddress && 'Addess',
              searchOptions.byDescription && 'Description',
            ]),
          },
        }),
      );
    }
  }, [dispatch, searchOptions.byAddress, searchOptions.byDescription]);

  const sendSearchHistoryItemRemoveEvent = useCallback(
    (objectId: string) => {
      const object = find(historyObjects, {id: objectId});
      if (object) {
        dispatch(
          sendAnalyticsEvent({
            name: 'Search_history_item_remove',
            data: {
              object_name: object.analyticsMetadata.name,
            },
          }),
        );
      }
    },
    [dispatch, historyObjects],
  );

  const sendSearchHistoryClearEvent = useCallback(() => {
    dispatch(
      sendAnalyticsEvent({
        name: 'Search_history_clear',
      }),
    );
  }, [dispatch]);

  const sendSearchResultsItemClickEvent = useCallback(
    ({
      isHistoryVisible,
      isFiltersApplied,
      isSearchQueryApplied,
    }: {
      isHistoryVisible: boolean;
      isFiltersApplied: boolean;
      isSearchQueryApplied: boolean;
    }) => {
      const type = [
        isSearchQueryApplied && ('Search' as const),
        isHistoryVisible && ('History' as const),
        isFiltersApplied && ('Filtered objects' as const),
      ];
      dispatch(
        sendAnalyticsEvent({
          name: 'Search_and_Filters_results_item_click',
          data: {
            type: compact(type),
          },
        }),
      );
    },
    [dispatch],
  );

  return {
    sendSearchViewEvent,
    sendSearchParametersViewEvent,
    sendSearchParameterOnEvent,
    sendSearchParametersCloseEvent,
    sendSearchHistoryItemRemoveEvent,
    sendSearchHistoryClearEvent,
    sendSearchResultsItemClickEvent,
  };
}
