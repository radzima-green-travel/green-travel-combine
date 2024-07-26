import {useRequestLoading, useTranslation} from 'core/hooks';
import {getObjectDetailsRequest} from 'core/actions/objectDetails';
import {selectObjectDetails} from 'core/selectors/objectDetails';
import {useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {ObjectDetailsScreenNavigationProps} from '../types';
import {useNavigation} from '@react-navigation/native';

export function useObjectDetailsDeepLinking() {
  const navigation = useNavigation<ObjectDetailsScreenNavigationProps>();

  const data = useSelector(selectObjectDetails);

  const {t} = useTranslation('objectDetails');
  const {loading} = useRequestLoading(getObjectDetailsRequest);

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
