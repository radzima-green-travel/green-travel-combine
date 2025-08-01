import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {CompositeNavigationProp} from '@react-navigation/native';
import {MainNavigatorParamsList, ProfileNavigatorParamsList} from 'core/types';
import {useSelector} from 'react-redux';
import {selectAppLanguage} from 'core/selectors';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';

export type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<ProfileNavigatorParamsList>,
  StackNavigationProp<MainNavigatorParamsList>
>;

export function useNavigateToPrivacyPolicyAndTnC() {
  const navigation = useNavigation<NavigationProps>();
  const currentLocale = useSelector(selectAppLanguage);
  const {t} = useTranslation('common');
  const navigateToPrivacyPolicy = useCallback(() => {
    navigation.navigate('InAppWebView', {
      url: `https://radzima.app/${currentLocale}/privacy-policy-text/`,
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
