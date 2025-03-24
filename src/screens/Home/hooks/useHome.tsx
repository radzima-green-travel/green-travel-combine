import {useCallback} from 'react';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useRequestLoading,
  useHomeAnalytics,
  useColorScheme,
  useOnRequestError,
} from 'core/hooks';
import {CardItem, HomePageCategory} from 'core/types';
import {selectHomePageData} from 'core/selectors';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {getHomePageDataRequest, refreshHomePageDataRequest} from 'core/actions';
import {HomeScreenNavigationProps} from '../types';
import {useSnackbar} from 'atoms';

export const useHome = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation<HomeScreenNavigationProps>();
  const theme = useColorScheme();
  const homeData = useSelector(selectHomePageData);
  const {show, ...snackBarProps} = useSnackbar();

  const {listRef, sendSelectCardEvent, sendSaveCardEvent, sendUnsaveCardEvent} =
    useHomeAnalytics();

  const {loading} = useRequestLoading(getHomePageDataRequest);
  const {errorTexts} = useOnRequestError(getHomePageDataRequest, '');
  const {loading: refreshing} = useRequestLoading(refreshHomePageDataRequest);

  const getHomePageData = useCallback(() => {
    dispatch(getHomePageDataRequest());
  }, [dispatch]);

  const refreshHomePageData = useCallback(() => {
    dispatch(refreshHomePageDataRequest());
  }, [dispatch]);

  const navigateToObjectsList = useCallback(
    ({categoryId, title}: {categoryId: string; title: string}) => {
      navigate('ObjectsList', {categoryId, title});
    },
    [navigate],
  );

  const onCategoryPress = useCallback(
    (category: HomePageCategory) => {
      navigateToObjectsList({categoryId: category.id, title: category.name});
      sendSelectCardEvent(
        category.analyticsMetadata.name,
        category.analyticsMetadata.name,
      );
    },
    [navigateToObjectsList, sendSelectCardEvent],
  );

  const navigateToObjectDetails = useCallback(
    ({id, name, cover, blurhash, analyticsMetadata}: CardItem) => {
      navigate('ObjectDetails', {
        objectId: id,
        objectCoverImageUrl: cover,
        objcetCoverBlurhash: blurhash,

        analytics: {
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      });
      sendSelectCardEvent(name, analyticsMetadata.categoryName);
    },
    [navigate, sendSelectCardEvent],
  );

  const sendIsFavoriteChangedEvent = useCallback(
    ({analyticsMetadata, name}: CardItem, nextIsFavorite: boolean) => {
      if (nextIsFavorite) {
        sendSaveCardEvent(name, analyticsMetadata.categoryName);
      } else {
        sendUnsaveCardEvent(name, analyticsMetadata.categoryName);
      }
    },
    [sendSaveCardEvent, sendUnsaveCardEvent],
  );

  useOnRequestError(refreshHomePageDataRequest, 'home', errorLabel => {
    show({
      title: errorLabel.text,
      type: 'error',
    });
  });

  return {
    loading,
    errorTexts,
    listRef,
    getHomePageData,
    refreshHomePageData,
    refreshing,
    navigateToObjectDetails,
    onCategoryPress,
    sendIsFavoriteChangedEvent,
    homeData,
    theme,
    snackBarProps,
  };
};
