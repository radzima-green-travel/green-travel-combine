import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';

import {
  useRequestLoading,
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
  const [newPassword, setNewPassword] = useState('');
  const {t} = useTranslation('authentification');
  const {passwordVisibility, rightIcon, handlePasswordVisibility} =
    useTogglePasswordVisibility('eye');
  const buttonText = t('save').toUpperCase();
  const dispatch = useDispatch();
  const navigation = useNavigation<NewPasswordScreenNavigationProps>();
  const {
    params: {email, code},
  } = useRoute<NewPasswordScreenRouteProps>();

  const onConfirmNewPassword = useCallback(() => {
    dispatch(confirmNewPasswordRequest({email, code, newPassword}));
  }, [code, dispatch, email, newPassword]);

  const {loading} = useRequestLoading(confirmNewPasswordRequest);

  return {
    t,
    navigation,
    buttonText,
    onConfirmNewPassword,
    newPassword,
    loading,
    rightIcon,
    passwordVisibility,
    handlePasswordVisibility,
    setNewPassword,
  };
};
