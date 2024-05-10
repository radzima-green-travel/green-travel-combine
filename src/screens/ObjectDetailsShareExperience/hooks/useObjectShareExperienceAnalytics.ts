import {useObject} from 'core/hooks';
import {sendAnalyticsEvent} from 'core/reducers';
import {selectObjectShareExperienceData} from 'core/selectors';
import {useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export function useObjectShareExperienceAnalytics() {
  const dispatch = useDispatch();

  const {objectId} = useSelector(selectObjectShareExperienceData) || {};

  const object = useObject(objectId || '');
  const {analyticsMetadata} = object || {};

  const ignoreCloseEvent = useRef(false);

  const sendVisitedModalCloseEvent = useCallback(
    (atLeastOneFieldFilled: boolean) => {
      if (analyticsMetadata && !ignoreCloseEvent.current) {
        dispatch(
          sendAnalyticsEvent({
            name: 'VisitedModal_close',
            data: {
              object_name: analyticsMetadata.name,
              object_category: analyticsMetadata.categoryName,
              at_least_one_field_filled: atLeastOneFieldFilled,
            },
          }),
        );
      }
    },
    [analyticsMetadata, dispatch],
  );

  const sendVisitedModalSendEvent = useCallback(
    ({
      visitedRating,
      averageTime,
    }: {
      visitedRating: number;
      averageTime: string;
    }) => {
      if (analyticsMetadata) {
        ignoreCloseEvent.current = true;
        dispatch(
          sendAnalyticsEvent({
            name: 'VisitedModal_send',
            data: {
              object_name: analyticsMetadata.name,
              object_category: analyticsMetadata.categoryName,
              visited_rating: visitedRating,
              visited_avg_object_time: averageTime,
            },
          }),
        );
      }
    },
    [analyticsMetadata, dispatch],
  );

  const sendReportInaccuranceViewEvent = useCallback(() => {
    if (analyticsMetadata) {
      dispatch(
        sendAnalyticsEvent({
          name: 'Report_inaccurance_view',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
            from_screen_name: 'VisitedModal',
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const reportInnacuranceFieldValue = useRef<string | null>(null);

  const onReportInnacuranceFieldValueChange = useCallback((value: string) => {
    reportInnacuranceFieldValue.current = value;
  }, []);

  const sendReportInaccuranceCloseEvent = useCallback(() => {
    if (analyticsMetadata && reportInnacuranceFieldValue.current !== null) {
      dispatch(
        sendAnalyticsEvent({
          name: 'Report_inaccurance_close',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
            at_least_one_field_filled: Boolean(
              reportInnacuranceFieldValue.current,
            ),
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendReportInaccuranceSendEvent = useCallback(() => {
    if (analyticsMetadata) {
      reportInnacuranceFieldValue.current = null;
      dispatch(
        sendAnalyticsEvent({
          name: 'Report_inaccurance_send',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata?.categoryName,
            from_screen_name: 'VisitedModal',
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  return {
    sendVisitedModalCloseEvent,
    sendVisitedModalSendEvent,
    sendReportInaccuranceViewEvent,
    sendReportInaccuranceSendEvent,
    onReportInnacuranceFieldValueChange,
    sendReportInaccuranceCloseEvent,
  };
}
