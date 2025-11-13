import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  useRequestLoading,
  useTranslation,
  useObjectDetailsActions,
  useObjectDetailsSelector,
} from 'core/hooks';
import { selectObjectDetails } from 'core/selectors';
import { ObjectDetailsScreenNavigationProps } from '../types';

export function useObjectDetailsDeepLinking() {
  const navigation = useNavigation<ObjectDetailsScreenNavigationProps>();

  const { t } = useTranslation('objectDetails');
  const data = useObjectDetailsSelector(selectObjectDetails);
  const { getObjectDetailsRequest } = useObjectDetailsActions();
  const { loading } = useRequestLoading(getObjectDetailsRequest);

  const navigateToMainPage = useCallback(() => {
    navigation.navigate('TabNavigator', {
      screen: 'HomeNavigator',
      params: {
        screen: 'Home',
      },
    });
  }, [navigation]);

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
