import {
  useObject,
  useOnRequestError,
  useRequestLoading,
  useTranslation,
} from 'core/hooks';
import {getInitialHomeDataRequest} from 'core/reducers';
import {useCallback, useMemo} from 'react';
import {useDispatch} from 'react-redux';
import {
  ObjectDetailsScreenNavigationProps,
  ObjectDetailsScreenRouteProps,
} from '../types';
import {useNavigation, useRoute} from '@react-navigation/native';

export function useObjectDetailsDeepLinking() {
  const navigation = useNavigation<ObjectDetailsScreenNavigationProps>();

  const dispatch = useDispatch();

  const {
    params: {objectId},
  } = useRoute<ObjectDetailsScreenRouteProps>();

  const data = useObject(objectId);

  const {t} = useTranslation('objectDetails');
  const {loading} = useRequestLoading(getInitialHomeDataRequest);
  const {errorTexts} = useOnRequestError(getInitialHomeDataRequest, '');
  const onTryAgainPress = useCallback(() => {
    dispatch(getInitialHomeDataRequest());
  }, [dispatch]);

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
    errorTexts,
    objectNotFoundErrorProps,
    onTryAgainPress,
    loading,
  };
}
