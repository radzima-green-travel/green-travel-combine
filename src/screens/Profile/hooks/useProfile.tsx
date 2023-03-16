import {useCallback} from 'react';
import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProps} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserAuthorized, selectUserEmail} from 'core/selectors';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';
import {
  googleSigninRequest,
  facebookSigninRequest,
  clearCacheRequest,
} from 'core/reducers';
import {useTranslation} from 'core/hooks';
import {useSnackbar} from '../../../components/atoms';

export const useProfile = () => {
  const {t} = useTranslation('profile');
  const dispatch = useDispatch();
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const isAuthorized = useSelector(selectUserAuthorized);
  const userEmail = useSelector(selectUserEmail);

  const onAuthorisationItemPress = useCallback(() => {
    if (isAuthorized) {
      navigation.navigate('ProfileDetails');
    } else {
      navigation.navigate('AuthNavigator', {
        screen: 'AuthMethodSelection',
      });
    }
  }, [isAuthorized, navigation]);

  const navigateToProfileSettingsLanguage = useCallback(() => {
    navigation.navigate('ProfileSettingsLanguage');
  }, [navigation]);

  const navigateToProfileSettingsTheme = useCallback(() => {
    navigation.navigate('ProfileSettingsTheme');
  }, [navigation]);

  const onClearCachePress = useCallback(() => {
    Alert.alert(t('clearCacheAlert'), t('deletedPhotos'), [
      {
        text: t('clear'),
        onPress: () => dispatch(clearCacheRequest()),
      },
      {text: t('cancel'), style: 'cancel'},
    ]);
  }, [t, dispatch]);

  const {loading: googleLoading} = useRequestLoading(googleSigninRequest);
  const {loading: facebookLoading} = useRequestLoading(facebookSigninRequest);

  const {show, ...snackBarProps} = useSnackbar();

  useOnRequestSuccess(clearCacheRequest, () => {
    show({
      type: 'positive',
      title: t('cacheCleared'),
    });
  });

  return {
    userEmail,
    isAuthorized,
    onAuthorisationItemPress,
    navigateToProfileSettingsLanguage,
    navigateToProfileSettingsTheme,
    onClearCachePress,
    loading: googleLoading || facebookLoading,
    snackBarProps,
  };
};
