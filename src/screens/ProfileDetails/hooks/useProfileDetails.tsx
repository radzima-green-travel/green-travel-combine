import {useCallback} from 'react';

import {useNavigation} from '@react-navigation/native';
import {ProfileDetailsScreenNavigationProps} from '../types';
import {
  useOnRequestSuccess,
  useRequestLoading,
  useThemeStyles,
  useTranslation,
} from 'core/hooks';
import {themeStyles} from '../styles';
import {useDispatch} from 'react-redux';
import {deleteUserRequest, signOutRequest} from 'core/reducers';
import {Alert} from 'react-native';

export const useProfileDetails = () => {
  const styles = useThemeStyles(themeStyles);
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

  useOnRequestSuccess(signOutRequest, () => {
    navigation.goBack();
  });

  useOnRequestSuccess(deleteUserRequest, () => {
    navigation.goBack();
  });

  return {t, styles, loading, onSignOutPress, deleting, onDeleteUserPress};
};
