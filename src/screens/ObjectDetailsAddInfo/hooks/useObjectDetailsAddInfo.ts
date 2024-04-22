import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ObjectDetailsAddInfoScreenNavigationProps,
  ObjectDetailsAddInfoScreenRouteProps,
} from '../types';
import {
  useBottomMenu,
  useObject,
  useObjectIncompleteFields,
  useOnRequestError,
  useRequestLoading,
  useTranslation,
  useBackHandler,
} from 'core/hooks';
import {useCallback, useState} from 'react';
import {Keyboard} from 'react-native';
import {useObjectInfoForm} from './useObjectInfoForm';
import {useDispatch} from 'react-redux';
import {sendAddInfoEmailRequest} from 'core/reducers';
import reduce from 'lodash/reduce';
import {useSnackbar} from 'atoms';
import {IObjectIncompleteField} from 'core/types';
import {TIME_PICKER_FIELDS} from 'core/constants';

export const useObjectDetailsAddInfo = () => {
  const navigation = useNavigation<ObjectDetailsAddInfoScreenNavigationProps>();
  const {
    params: {objectId, showSuccessMenu},
  } = useRoute<ObjectDetailsAddInfoScreenRouteProps>();
  const {t} = useTranslation('objectDetailsAddInfo');
  const objectData = useObject(objectId);
  const incompleteFields = useObjectIncompleteFields(
    objectData?.category.imcompletedFieldsNames ?? [],
  );
  const bottomMenuProps = useBottomMenu();
  const confirmBottomMenuProps = useBottomMenu();
  const [currentField, setCurrentField] =
    useState<IObjectIncompleteField | null>(null);
  const {form, onChangeField, isFormValid, getDisplayValue} =
    useObjectInfoForm(incompleteFields);
  const value = currentField ? form[currentField.id] : '';
  const dispatch = useDispatch();
  const snackBarProps = useSnackbar();
  const objectName = objectData?.name;

  const toggleMenu = useCallback(
    (menu: IObjectIncompleteField | null) => {
      setCurrentField(menu);
      if (menu) {
        if (TIME_PICKER_FIELDS.has(menu.id)) {
          bottomMenuProps.openMenu();
        } else {
          bottomMenuProps.openMenuWithInputAutoFocus();
        }
      }
    },
    [bottomMenuProps],
  );

  const closeMenu = useCallback(() => {
    Keyboard.dismiss();
    bottomMenuProps.closeMenu();
  }, [bottomMenuProps]);

  const navigateBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }, [navigation]);

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

  const openConfirmMenu = useCallback(() => {
    const {fields} = getEmailContents();

    if (fields) {
      confirmBottomMenuProps.openMenu();
      return;
    }
    navigateBack();
  }, [confirmBottomMenuProps, getEmailContents, navigateBack]);

  useBackHandler(() => {
    if (!confirmBottomMenuProps.isMenuOpened()) {
      openConfirmMenu();
      return true;
    }
    return false;
  });

  const onSendPress = useCallback(() => {
    if (objectId && objectName) {
      const {message, fields} = getEmailContents();

      confirmBottomMenuProps.closeMenu();

      dispatch(
        sendAddInfoEmailRequest({
          subject: t('addInfoEmailSubject', {objectName, fields}),
          message,
          objectId,
          showSuccessMenu,
        }),
      );
    }
  }, [
    objectId,
    objectName,
    getEmailContents,
    dispatch,
    t,
    showSuccessMenu,
    confirmBottomMenuProps,
  ]);

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

  return {
    name: objectName,
    navigateBack,
    currentField,
    addInfoMenuProps: bottomMenuProps,
    toggleMenu,
    closeMenu,
    incompleteFields,
    onChange: onChangeField,
    value,
    isFormValid,
    getDisplayValue,
    onSendPress,
    isSendLoading,
    snackBarProps,
    openConfirmMenu,
    confirmMenuProps: confirmBottomMenuProps,
  };
};
