import {useCallback} from 'react';
import {useToast} from 'atoms';
import {AppStateStatus} from 'react-native';

import {themeStyles} from '../styles';
import {
  getHomeDataUpdatesRequest,
  getInitialHomeDataRequest,
  getHomeDataUpdateAvailableRequest,
} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {selectHomeData, selectIsUpdatesAvailable} from 'core/selectors';
import {
  useRequestError,
  useRequestLoading,
  useTranslation,
  useColorScheme,
  useThemeStyles,
  useHomeAnalytics,
} from 'core/hooks';
import {useIsFocused} from '@react-navigation/core';
import {IObject, ITransformedCategory} from 'core/types';
import {HomeScreenNavigationProps} from '../types';
import {useNavigation} from '@react-navigation/native';

export const useHome = () => {
  const {t} = useTranslation('home');
  const styles = useThemeStyles(themeStyles);
  const dispatch = useDispatch();
  const theme = useColorScheme();
  const homeData = useSelector(selectHomeData);
  const isUpdatesAvailable = useSelector(selectIsUpdatesAvailable);
  const {ref, show: showToast} = useToast();
  const isFocused = useIsFocused();
  const {navigate} = useNavigation<HomeScreenNavigationProps>();

  const {
    listRef,
    sendSelectCardEvent,
    sendSelectAllEvent,
    sendSaveCardEvent,
    sendUnsaveCardEvent,
  } = useHomeAnalytics();

  const getData = useCallback(() => {
    dispatch(getHomeDataUpdatesRequest());
  }, [dispatch]);

  const getInitialData = useCallback(() => {
    dispatch(getInitialHomeDataRequest());
  }, [dispatch]);

  const {loading} = useRequestLoading(getInitialHomeDataRequest);
  const {error} = useRequestError(getInitialHomeDataRequest);

  const {loading: refreshing} = useRequestLoading(getHomeDataUpdatesRequest);
  const {error: updateError} = useRequestError(getHomeDataUpdatesRequest);

  const checkUpdates = useCallback(
    (state: AppStateStatus, prevState: AppStateStatus) => {
      if (state === 'active' && prevState === 'background') {
        dispatch(getHomeDataUpdateAvailableRequest());
      }
    },
    [dispatch],
  );

  const navigateToObjectsList = useCallback(
    ({categoryId, title}: {categoryId: string; title: string}) => {
      navigate('ObjectsList', {categoryId, title});
    },
    [navigate],
  );

  const onCategoryPress = useCallback(
    (category: ITransformedCategory, parentCategoryName: string) => {
      navigateToObjectsList({categoryId: category.id, title: category.name});
      sendSelectCardEvent(category.name, parentCategoryName);
    },
    [navigateToObjectsList, sendSelectCardEvent],
  );

  const onAllObjectsPress = useCallback(
    (data: {categoryId: string; title: string}) => {
      sendSelectAllEvent(data.title);
      navigateToObjectsList(data);
    },
    [navigateToObjectsList, sendSelectAllEvent],
  );

  const navigateToCategoriesList = useCallback(
    ({categoryId, title}: {categoryId: string; title: string}) => {
      navigate('CategoriesList', {categoryId, title});
      sendSelectAllEvent(title);
    },
    [navigate, sendSelectAllEvent],
  );

  const navigateToObjectDetails = useCallback(
    ({id, name, category}: IObject) => {
      navigate('ObjectDetails', {objectId: id});
      sendSelectCardEvent(name, category.name);
    },
    [navigate, sendSelectCardEvent],
  );

  const sendIsFavoriteChangedEvent = useCallback(
    ({name, category}: IObject, nextIsFavoriteStatus: boolean) => {
      if (nextIsFavoriteStatus) {
        sendSaveCardEvent(name, category.name);
      } else {
        sendUnsaveCardEvent(name, category.name);
      }
    },
    [sendSaveCardEvent, sendUnsaveCardEvent],
  );

  return {
    t,
    updateError,
    showToast,
    checkUpdates,
    dispatch,
    loading,
    homeData,
    error,
    listRef,
    getInitialData,
    styles,
    theme,
    refreshing,
    isFocused,
    getData,
    navigateToObjectDetails,
    onCategoryPress,
    onAllObjectsPress,
    navigateToCategoriesList,
    sendIsFavoriteChangedEvent,
    isUpdatesAvailable,
    ref,
  };
};
