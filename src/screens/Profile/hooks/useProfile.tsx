import {useCallback} from 'react';
import {Alert} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {ProfileScreenNavigationProps} from '../types';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectUserAuthorized,
  selectAppLanguage,
  selectAppTheme,
} from 'core/selectors';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';
import {clearCacheRequest, signInRequest} from 'core/reducers';
import {useNavigateToPrivacyPolicyAndTnC, useTranslation} from 'core/hooks';
import {useSnackbar} from '../../../components/atoms';
import {getLanguageByLocale} from 'core/helpers';

export const useProfile = () => {
  const {t} = useTranslation('profile');
  const dispatch = useDispatch();
  const navigation = useNavigation<ProfileScreenNavigationProps>();
  const isAuthorized = useSelector(selectUserAuthorized);
  const appLanguage = useSelector(selectAppLanguage);
  const appTheme = useSelector(selectAppTheme);

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

  const {navigateToPrivacyPolicy, navigateToTermsAndConditions} =
    useNavigateToPrivacyPolicyAndTnC();

  const onClearCachePress = useCallback(() => {
    Alert.alert(t('clearCacheAlert'), t('deletedPhotos'), [
      {
        text: t('clear'),
        onPress: () => dispatch(clearCacheRequest()),
      },
      {text: t('cancel'), style: 'cancel'},
    ]);
  }, [t, dispatch]);

  const language = getLanguageByLocale(appLanguage);

  const theme = appTheme ? t(`${appTheme}`) : t('systemTheme');

  const {loading} = useRequestLoading(signInRequest);

  const {show, ...snackBarProps} = useSnackbar();

  useOnRequestSuccess(clearCacheRequest, () => {
    show({
      type: 'success',
      title: t('cacheCleared'),
    });
  });

  return {
    isAuthorized,
    language,
    theme,
    onAuthorisationItemPress,
    navigateToProfileSettingsLanguage,
    navigateToProfileSettingsTheme,
    onClearCachePress,
    loading: loading,
    snackBarProps,
    navigateToPrivacyPolicy,
    navigateToTermsAndConditions,
  };
};
