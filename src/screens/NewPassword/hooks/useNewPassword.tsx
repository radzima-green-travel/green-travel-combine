import {useCallback, useState} from 'react';
import {useDispatch} from 'react-redux';

import {useRequestLoading} from 'core/hooks';
import {useNavigation, useRoute} from '@react-navigation/native';
import {confirmNewPasswordRequest} from 'core/reducers';
import {
  NewPasswordScreenNavigationProps,
  NewPasswordScreenRouteProps,
} from '../types';

export const useNewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
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
    navigation,
    onConfirmNewPassword,
    newPassword,
    loading,
    setNewPassword,
  };
};
