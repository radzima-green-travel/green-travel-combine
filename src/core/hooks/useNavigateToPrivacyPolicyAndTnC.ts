import {useSelector} from 'react-redux';
import {selectAppLanguage} from 'core/selectors';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useRouter} from 'expo-router';

export function useNavigateToPrivacyPolicyAndTnC() {
  const router = useRouter();

  const currentLocale = useSelector(selectAppLanguage);

  const {t} = useTranslation('common');

  const navigateToPrivacyPolicy = useCallback(() => {
    router.navigate({
      pathname: '/web-view',
      params: {
        url: `https://radzima.app/${currentLocale}/privacy-policy-text/`,
        title: t('privacyPolicy'),
      },
    });
  }, [currentLocale, router, t]);

  const navigateToTermsAndConditions = useCallback(() => {
    router.navigate({
      pathname: '/web-view',
      params: {
        url: `https://radzima.app/${currentLocale}/tearms-and-conditions-text/`,
        title: t('termsAndConditions'),
      },
    });
  }, [currentLocale, router, t]);

  return {
    navigateToPrivacyPolicy,
    navigateToTermsAndConditions,
  };
}
