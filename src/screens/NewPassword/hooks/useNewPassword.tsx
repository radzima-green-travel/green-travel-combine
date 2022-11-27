import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';

import {
  useRequestLoading,
  useOnRequestSuccess,
  useTogglePasswordVisibility,
  useTranslation,
} from 'core/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {confirmNewPasswordRequest} from 'core/reducers';
import {
  NewPasswordScreenNavigationProps,
  NewPasswordScreenRouteProps,
} from '../types';

export const useNewPassword = () => {
  const {t} = useTranslation('authentification');
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation<NewPasswordScreenNavigationProps>();
  const {
    params: {email, code},
  } = useRoute<NewPasswordScreenRouteProps>();

  const onConfirmNewPassword = useCallback(() => {
    dispatch(confirmNewPasswordRequest({email, code, newPassword}));
  }, [code, dispatch, email, newPassword]);

  const {loading} = useRequestLoading(confirmNewPasswordRequest);

  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');
  const buttonText = t('save').toUpperCase();

  useOnRequestSuccess(confirmNewPasswordRequest, () => {
    navigation.getParent()?.goBack();
  });

  return {
    onConfirmNewPassword,
    newPassword,
    loading,
    setNewPassword,
    buttonText,
    rightIcon,
    passwordVisibility,
    handlePasswordVisibility,
  };
};
