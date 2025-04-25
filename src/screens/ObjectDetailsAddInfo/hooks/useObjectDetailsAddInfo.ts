import {
  useBottomMenu,
  useOnRequestError,
  useRequestLoading,
  useTranslation,
  useBackHandler,
  useObjectDetailsSelector,
  useObjectIncompleteFields,
} from 'core/hooks';
import {useCallback, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {useObjectInfoForm} from './useObjectInfoForm';
import {useDispatch} from 'react-redux';
import {sendAddInfoEmailRequest} from 'core/actions';
import reduce from 'lodash/reduce';
import {useSnackbar} from 'atoms';
import {IObjectIncompleteField} from 'core/types';
import {ObjectField, TIME_PICKER_FIELDS} from 'core/constants';
import {useObjectAddInfoAnalytics} from './useObjectAddInfoAnalytics';
import {filter} from 'lodash';
import {useRouter} from 'expo-router';
import {selectObjectDetails} from 'core/selectors';

export const useObjectDetailsAddInfo = () => {
  const router = useRouter();

  const objectData = useObjectDetailsSelector(selectObjectDetails);

  const objectId = objectData?.id,
    objectName = objectData?.name;

  const incompleteFields = useObjectIncompleteFields(
    objectData?.category.incompleteFieldsNames ?? [],
  );

  const {t} = useTranslation('objectDetailsAddInfo');
  const bottomMenuProps = useBottomMenu();
  const confirmBottomMenuProps = useBottomMenu();
  const [currentField, setCurrentField] =
    useState<IObjectIncompleteField | null>(null);
  const {form, onChangeField, isFormValid, getDisplayValue} =
    useObjectInfoForm(incompleteFields);

  const value = currentField ? form[currentField.id] : '';
  const dispatch = useDispatch();
  const snackBarProps = useSnackbar();

  const {
    sendAddInfoModalViewEvent,
    sendAddInfoModalAnyFieldViewEvent,
    sendAddInfoModalSendAllEvent,
    sendAddInfoModalConfirmSaveYesButtonClickEvent,
    sendAddInfoModalConfirmSaveNoButtonClickEvent,
    sendAddInfoModalAnyFieldInputSubmitEvent,
    sendAddInfoModalAnyFieldInputCloseEvent,
    saveCurrentFieldValueForAnalytics,
  } = useObjectAddInfoAnalytics();

  useEffect(() => {
    sendAddInfoModalViewEvent();
  }, [sendAddInfoModalViewEvent]);

  const getIsDataCanBeLost = () => {
    const {fields} = getEmailContents();
    return !!fields;
  };

  const toggleMenu = useCallback(
    (menu: IObjectIncompleteField | null) => {
      setCurrentField(menu);
      if (menu) {
        sendAddInfoModalAnyFieldViewEvent(menu.id);
        if (TIME_PICKER_FIELDS.has(menu.id)) {
          bottomMenuProps.openMenu();
        } else {
          bottomMenuProps.openMenuWithInputAutoFocus();
        }
      }
    },
    [bottomMenuProps, sendAddInfoModalAnyFieldViewEvent],
  );

  const closeMenu = useCallback(() => {
    Keyboard.dismiss();
    bottomMenuProps.closeMenu();
  }, [bottomMenuProps]);

  const navigateBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    }
  }, [router]);

  const getEmailContents = useCallback(() => {
    const contents = reduce(
      incompleteFields,
      (acc, {id, label}) => {
        if (form[id]) {
          const change = `${label}: ${getDisplayValue(id)}`;
          acc.message ||= change;
          acc.fields ||= label;

          if (acc.message !== change) {
            acc.message += '<br>' + change;
          }

          if (acc.fields !== label) {
            acc.fields += ', ' + label;
          }
        }

        return acc;
      },
      {message: '', fields: ''},
    );

    return contents;
  }, [form, getDisplayValue, incompleteFields]);

  const onBackPress = () => {
    if (getIsDataCanBeLost()) {
      confirmBottomMenuProps.openMenu();
    } else {
      navigateBack();
    }
  };

  const sendFilledData = useCallback(() => {
    if (objectId && objectName) {
      const {message, fields} = getEmailContents();

      confirmBottomMenuProps.closeMenu();

      dispatch(
        sendAddInfoEmailRequest({
          subject: t('addInfoEmailSubject', {objectName, fields}),
          message,
          objectId,
          showSuccessMenu: false,
        }),
      );
    }
  }, [
    objectId,
    objectName,
    getEmailContents,
    confirmBottomMenuProps,
    dispatch,
    t,
  ]);

  const onSendPress = useCallback(() => {
    sendFilledData();
    sendAddInfoModalSendAllEvent(
      filter(incompleteFields, field => Boolean(form[field.id])),
    );
  }, [form, incompleteFields, sendAddInfoModalSendAllEvent, sendFilledData]);

  const {loading: isSendLoading} = useRequestLoading(sendAddInfoEmailRequest);

  useOnRequestError(
    sendAddInfoEmailRequest,
    'objectDetailsAddInfo',
    errorLabel => {
      snackBarProps.show({
        type: 'error',
        title: errorLabel.text,
      });
    },
  );

  useBackHandler(() => {
    if (isSendLoading) {
      return true;
    }

    if (bottomMenuProps.isMenuOpened()) {
      bottomMenuProps.closeMenu();
      return true;
    }

    if (getIsDataCanBeLost() && confirmBottomMenuProps.isMenuClosed()) {
      confirmBottomMenuProps.openMenu();
      return true;
    }

    return false;
  });

  const onConfirmMenuConfirmPress = useCallback(() => {
    sendAddInfoModalConfirmSaveYesButtonClickEvent(
      filter(incompleteFields, field => Boolean(form[field.id])),
    );
    sendFilledData();
  }, [
    form,
    incompleteFields,
    sendFilledData,
    sendAddInfoModalConfirmSaveYesButtonClickEvent,
  ]);

  const onConfirmMenuDeclinePress = useCallback(() => {
    sendAddInfoModalConfirmSaveNoButtonClickEvent(
      filter(incompleteFields, field => Boolean(form[field.id])),
    );
    navigateBack();
  }, [
    form,
    incompleteFields,
    navigateBack,
    sendAddInfoModalConfirmSaveNoButtonClickEvent,
  ]);

  const onChange = useCallback(
    (field: ObjectField, fieldValue: string | number) => {
      sendAddInfoModalAnyFieldInputSubmitEvent(field);
      onChangeField(field, fieldValue);
    },
    [onChangeField, sendAddInfoModalAnyFieldInputSubmitEvent],
  );

  const onMenuHideEnd = useCallback(() => {
    sendAddInfoModalAnyFieldInputCloseEvent();
    toggleMenu(null);
  }, [sendAddInfoModalAnyFieldInputCloseEvent, toggleMenu]);

  return {
    name: objectName,
    navigateBack,
    currentField,
    addInfoMenuProps: bottomMenuProps,
    toggleMenu,
    closeMenu,
    incompleteFields,
    onChange: onChange,
    value,
    isFormValid,
    getDisplayValue,
    onSendPress,
    isSendLoading,
    snackBarProps,
    onBackPress,
    confirmMenuProps: confirmBottomMenuProps,
    onConfirmMenuConfirmPress,
    onConfirmMenuDeclinePress,
    onMenuHideEnd,
    saveCurrentFieldValueForAnalytics,
  };
};
