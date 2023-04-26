import {useCallback} from 'react';

import {useNavigation} from '@react-navigation/native';
import {ProfileDetailsScreenNavigationProps} from '../types';
import {
  useOnRequestSuccess,
  useRequestLoading,
  useTranslation,
} from 'core/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUserRequest, signOutRequest} from 'core/reducers';
import {Alert} from 'react-native';
import {
  selectFullUserName,
  selectIsAuthorizedWithSocialProviders,
  selectUserAuthorized,
} from 'core/selectors';

export const useProfileDetails = () => {
  const {t} = useTranslation('profile');
  const dispatch = useDispatch();
  const navigation = useNavigation<ProfileDetailsScreenNavigationProps>();
  const {loading} = useRequestLoading(signOutRequest);
  const {loading: deleting} = useRequestLoading(deleteUserRequest);

  const onSignOutPress = useCallback(() => {
    Alert.alert(t('exitAccount'), t('notCancaled'), [
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
  const userName = useSelector(selectFullUserName);

  const onChangePasswordPress = useCallback(() => {
    navigation.navigate('AuthNavigator', {
      screen: 'ChangePassword',
    });
  }, [navigation]);

  const isAuthorizedWithSocialProviders = useSelector(
    selectIsAuthorizedWithSocialProviders,
  );

  useOnRequestSuccess(signOutRequest, () => {
    navigation.goBack();
  });

  useOnRequestSuccess(deleteUserRequest, () => {
    navigation.goBack();
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
  };
};
