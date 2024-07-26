import {sendAnalyticsEvent} from 'core/reducers';
import {useCallback, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ObjectDetailsAddInfoScreenRouteProps} from '../types';
import {useRoute} from '@react-navigation/native';
import {selectObjectDetails} from 'core/selectors';
import {ObjectField} from 'core/constants';
import {
  getObjectDetailsAnalyticsIncompleteFieldName,
  getObjectDetailsAnalyticsIncompleteFieldsNames,
} from 'core/helpers';
import {IObjectIncompleteField} from 'core/types';

export function useObjectAddInfoAnalytics() {
  const dispatch = useDispatch();

  const {
    params: {analytics},
  } = useRoute<ObjectDetailsAddInfoScreenRouteProps>();

  const data = useSelector(selectObjectDetails);

  const {analyticsMetadata} = data || {};

  const focusedFieldData = useRef<{
    fieldName: ObjectField;
    value: string | number;
  } | null>(null);

  const saveCurrentFieldValueForAnalytics = useCallback(
    (fieldName: ObjectField, value: string | number) => {
      focusedFieldData.current = {fieldName, value};
    },
    [],
  );

  const sendAddInfoModalViewEvent = useCallback(() => {
    if (analyticsMetadata && analytics) {
      dispatch(
        sendAnalyticsEvent({
          name: 'AddInfoModal_view',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata.categoryName,
            from_screen_name: analytics.fromScreenName,
          },
        }),
      );
    }
  }, [analytics, analyticsMetadata, dispatch]);

  const sendAddInfoModalAnyFieldViewEvent = useCallback(
    (incompletFieldName: ObjectField) => {
      if (analyticsMetadata) {
        dispatch(
          sendAnalyticsEvent({
            name: 'AddInfoModal_any_field_view',
            data: {
              object_name: analyticsMetadata.name,
              object_category: analyticsMetadata.categoryName,
              field_name:
                getObjectDetailsAnalyticsIncompleteFieldName(
                  incompletFieldName,
                ),
            },
          }),
        );
      }
    },
    [analyticsMetadata, dispatch],
  );

  const sendAddInfoModalSendAllEvent = useCallback(
    (notEmptyFields: IObjectIncompleteField[]) => {
      if (analyticsMetadata) {
        dispatch(
          sendAnalyticsEvent({
            name: 'AddInfoModal_send_all',
            data: {
              object_name: analyticsMetadata.name,
              object_category: analyticsMetadata.categoryName,
              not_empty_fields:
                getObjectDetailsAnalyticsIncompleteFieldsNames(notEmptyFields),
            },
          }),
        );
      }
    },
    [analyticsMetadata, dispatch],
  );

  const sendAddInfoModalAnyFieldInputCloseEvent = useCallback(() => {
    if (analyticsMetadata && focusedFieldData.current) {
      const {fieldName, value} = focusedFieldData.current;
      dispatch(
        sendAnalyticsEvent({
          name: 'AddInfoModal_any_field_input_close',
          data: {
            object_name: analyticsMetadata.name,
            object_category: analyticsMetadata.categoryName,
            field_name: getObjectDetailsAnalyticsIncompleteFieldName(fieldName),
            at_least_one_field_filled: Boolean(value),
          },
        }),
      );
    }
  }, [analyticsMetadata, dispatch]);

  const sendAddInfoModalAnyFieldInputSubmitEvent = useCallback(
    (fieldName: ObjectField) => {
      if (analyticsMetadata) {
        focusedFieldData.current = null;

        dispatch(
          sendAnalyticsEvent({
            name: 'AddInfoModal_any_field_input_submit',
            data: {
              object_name: analyticsMetadata.name,
              object_category: analyticsMetadata.categoryName,
              field_name:
                getObjectDetailsAnalyticsIncompleteFieldName(fieldName),
            },
          }),
        );
      }
    },
    [analyticsMetadata, dispatch],
  );

  const sendAddInfoModalConfirmSaveNoButtonClickEvent = useCallback(
    (notEmptyFields: IObjectIncompleteField[]) => {
      if (analyticsMetadata) {
        dispatch(
          sendAnalyticsEvent({
            name: 'AddInfoModal_confirm_save_no_button_click',
            data: {
              object_name: analyticsMetadata.name,
              object_category: analyticsMetadata.categoryName,
              not_empty_fields:
                getObjectDetailsAnalyticsIncompleteFieldsNames(notEmptyFields),
            },
          }),
        );
      }
    },
    [analyticsMetadata, dispatch],
  );

  const sendAddInfoModalConfirmSaveYesButtonClickEvent = useCallback(
    (notEmptyFields: IObjectIncompleteField[]) => {
      if (analyticsMetadata) {
        dispatch(
          sendAnalyticsEvent({
            name: 'AddInfoModal_confirm_save_yes_button_click',
            data: {
              object_name: analyticsMetadata.name,
              object_category: analyticsMetadata.categoryName,
              not_empty_fields:
                getObjectDetailsAnalyticsIncompleteFieldsNames(notEmptyFields),
            },
          }),
        );
      }
    },
    [analyticsMetadata, dispatch],
  );

  return {
    sendAddInfoModalViewEvent,
    sendAddInfoModalAnyFieldViewEvent,
    sendAddInfoModalSendAllEvent,
    sendAddInfoModalAnyFieldInputCloseEvent,
    saveCurrentFieldValueForAnalytics,
    sendAddInfoModalAnyFieldInputSubmitEvent,
    sendAddInfoModalConfirmSaveNoButtonClickEvent,
    sendAddInfoModalConfirmSaveYesButtonClickEvent,
  };
}
