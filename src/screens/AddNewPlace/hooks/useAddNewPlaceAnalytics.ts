import {sendAnalyticsEvent} from 'core/actions';
import {
  AddNewObjectAnalyicsFieldsMap,
  NewPlaceForm,
} from 'core/types/addNewPlace';
import {reduce} from 'lodash';
import {useCallback, useRef} from 'react';
import {useDispatch} from 'react-redux';

export function useAddNewPlaceAnalytics() {
  const dispatch = useDispatch();

  const atLeastOneFieldFilled = useRef(false);

  const sendAddNewPlaceViewEvent = useCallback(() => {
    dispatch(
      sendAnalyticsEvent({
        name: 'AddObject_view',
      }),
    );
  }, [dispatch]);

  const sendAddAnyFieldViewEvent = useCallback(
    (fieldName: keyof NewPlaceForm.Schema | null) => {
      if (fieldName) {
        dispatch(
          sendAnalyticsEvent({
            name: 'Add_any_ObjectField_view',
            data: {field_name: AddNewObjectAnalyicsFieldsMap[fieldName]},
          }),
        );
      }
    },
    [dispatch],
  );

  const sendAddAnyFieldInputSubmitEvent = useCallback(
    (fieldName: keyof NewPlaceForm.Schema | null) => {
      if (fieldName) {
        dispatch(
          sendAnalyticsEvent({
            name: 'Add_any_ObjectField_input_submit',
            data: {field_name: AddNewObjectAnalyicsFieldsMap[fieldName]},
          }),
        );
        atLeastOneFieldFilled.current = true;
      }
    },
    [dispatch],
  );

  const sendAddNewPlaceSendAllEvent = useCallback(
    (values: NewPlaceForm.Schema) => {
      const field_values = reduce(
        values,
        (acc, value, key) => {
          if (value) {
            acc.push(AddNewObjectAnalyicsFieldsMap[key]);
          }
          return acc;
        },
        [] as string[],
      );

      dispatch(
        sendAnalyticsEvent({
          name: 'AddObject_send_all',
          data: {field_values: field_values},
        }),
      );
    },
    [dispatch],
  );

  const sendAddNewPlaceCloseEvent = useCallback(() => {
    dispatch(
      sendAnalyticsEvent({
        name: 'AddObject_close',
        data: {at_least_one_field_filled: atLeastOneFieldFilled.current},
      }),
    );
  }, [dispatch]);

  return {
    sendAddNewPlaceViewEvent,
    sendAddAnyFieldViewEvent,
    sendAddAnyFieldInputSubmitEvent,
    sendAddNewPlaceSendAllEvent,
    sendAddNewPlaceCloseEvent,
  };
}
