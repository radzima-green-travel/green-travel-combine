import {useCallback} from 'react';
import {Alert} from 'react-native';

import {clearCacheRequest, signInRequest} from 'core/actions';
import {getLanguageByLocale} from 'core/helpers';
import {useNavigateToPrivacyPolicyAndTnC, useTranslation} from 'core/hooks';
import {
  selectAppLanguage,
  selectAppTheme,
  selectUserAuthorized,
} from 'core/selectors';
import {useRouter} from 'expo-router';
import {useDispatch, useSelector} from 'react-redux';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';
import {useSnackbar} from '../../../components/atoms';

export const useProfile = () => {
  const {t} = useTranslation('profile');
  const dispatch = useDispatch();
  const router = useRouter();
  const isAuthorized = useSelector(selectUserAuthorized);
  const appLanguage = useSelector(selectAppLanguage);
  const appTheme = useSelector(selectAppTheme);

  const onAuthorisationItemPress = useCallback(() => {
    if (isAuthorized) {
      router.navigate('/profile-details');
    } else {
      router.navigate('/auth-method-selection');
    }
  }, [isAuthorized, router]);

  const navigateToProfileSettingsLanguage = useCallback(() => {
    router.navigate('/language-selection');
  }, [router]);

  const navigateToProfileSettingsTheme = useCallback(() => {
    router.navigate('/theme-selection');
  }, [router]);

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
      type: 'neutral',
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
