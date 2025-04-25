import {useCallback} from 'react';
import {useSnackbar} from 'atoms';
import {
  changePasswordRequest,
  deleteUserRequest,
  signOutRequest,
} from 'core/actions';
import {
  useOnRequestSuccess,
  useRequestLoading,
  useTranslation,
} from 'core/hooks';
import {
  selectIsAuthorizedWithSocialProviders,
  selectUserAuthorized,
  selectUserEmail,
} from 'core/selectors';
import {useRouter} from 'expo-router';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

export const useProfileDetails = () => {
  const {t} = useTranslation('profile');
  const dispatch = useDispatch();
  const router = useRouter();
  const {loading} = useRequestLoading(signOutRequest);
  const {loading: deleting} = useRequestLoading(deleteUserRequest);

  const onSignOutPress = useCallback(() => {
    Alert.alert(t('exitAccount'), '', [
      {
        text: t('ok'),
        onPress: () => dispatch(signOutRequest()),
      },
      {text: t('cancel'), style: 'cancel'},
    ]);
  }, [t, dispatch]);

  const onDeleteUserPress = useCallback(() => {
    Alert.alert(t('deleteAccount'), t('notCancaled'), [
      {
        text: t('ok'),
        onPress: () => dispatch(deleteUserRequest()),
      },
      {text: t('cancel'), style: 'cancel'},
    ]);
  }, [t, dispatch]);

  const isAuthorized = useSelector(selectUserAuthorized);
  const userName = useSelector(selectUserEmail);

  const onChangePasswordPress = useCallback(() => {
    router.navigate('/change-password');
  }, [router]);

  const isAuthorizedWithSocialProviders = useSelector(
    selectIsAuthorizedWithSocialProviders,
  );

  const {show, ...snackBarProps} = useSnackbar();

  useOnRequestSuccess(signOutRequest, router.back);

  useOnRequestSuccess(deleteUserRequest, router.back);

  useOnRequestSuccess(changePasswordRequest, () => {
    show({
      type: 'success',
      title: t('passwordChanged'),
    });
  });

  return {
    loading,
    onSignOutPress,
    deleting,
    onDeleteUserPress,
    isAuthorized,
    userName,
    onChangePasswordPress,
    isChangePasswordAvailable: !isAuthorizedWithSocialProviders,
    snackBarProps,
  };
};
