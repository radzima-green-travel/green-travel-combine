import {
  useNavigation,
  CompositeNavigationProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  MainNavigatorParamsList,
  ProfileNavigatorParamsList,
} from 'core/types';
import { useSelector } from 'react-redux';
import { selectAppLanguage } from 'core/selectors';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<ProfileNavigatorParamsList>,
  NativeStackNavigationProp<MainNavigatorParamsList>
>;

export function useNavigateToPrivacyPolicyAndTnC() {
  const navigation = useNavigation<NavigationProps>();
  const currentLocale = useSelector(selectAppLanguage);
  const { t } = useTranslation('common');
  const navigateToPrivacyPolicy = useCallback(() => {
    navigation.navigate('InAppWebView', {
      url: `https://radzima.app/${currentLocale}/privacy-policy-text/`,
      // typescript complains on string | undefined issue for some obscure reason
      // if you assign t('privacyPolicy') to a variable and pass to title, it won't
      title: t('privacyPolicy')!,
    });
  }, [currentLocale, navigation, t]);

  const navigateToTermsAndConditions = useCallback(() => {
    navigation.navigate('InAppWebView', {
      url: `https://radzima.app/${currentLocale}/tearms-and-conditions-text/`,
      title: t('termsAndConditions')!,
    });
  }, [currentLocale, navigation, t]);

  return {
    navigateToPrivacyPolicy,
    navigateToTermsAndConditions,
  };
}
