import {useCallback, useMemo} from 'react';
import {
  useRequestLoading,
  useTranslation,
  useObjectDetailsActions,
} from 'core/hooks';
import {selectObjectDetails} from 'core/selectors';
import {useObjectDetailsSelector} from 'core/hooks';
import {useRouter} from 'expo-router';

export function useObjectDetailsDeepLinking() {
  const router = useRouter();

  const {t} = useTranslation('objectDetails');
  const data = useObjectDetailsSelector(selectObjectDetails);
  const {getObjectDetailsRequest} = useObjectDetailsActions();
  const {loading} = useRequestLoading(getObjectDetailsRequest);

  const navigateToMainPage = useCallback(() => {
    router.navigate('/(home)');
  }, [router]);

  const objectNotFoundErrorProps = useMemo(() => {
    if (!loading && !data) {
      return {
        error: {
          text: t('objectNotFoundText'),
          title: t('objectNotFoundTitle'),
        },
        buttonText: t('objectNotFoundButtonText'),
        retryCallback: navigateToMainPage,
      };
    }

    return {};
  }, [data, loading, navigateToMainPage, t]);

  return {
    objectNotFoundErrorProps,
  };
}
