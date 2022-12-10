import {useCallback} from 'react';
import {AppStateStatus, InteractionManager} from 'react-native';

import {
  getHomeDataUpdatesRequest,
  getInitialHomeDataRequest,
  getHomeDataUpdateAvailableRequest,
} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {
  useRequestError,
  useRequestLoading,
  useHomeAnalytics,
  useColorScheme,
  useAppState,
  useOnRequestError,
} from 'core/hooks';
import {IObject, ITransformedCategory} from 'core/types';
import {HomeScreenNavigationProps} from '../types';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {selectHomeData, selectIsUpdatesAvailable} from 'core/selectors';
import {useSnackbar} from 'atoms';

export const useHome = () => {
  const dispatch = useDispatch();
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

  const theme = useColorScheme();
  const homeData = useSelector(selectHomeData);
  const isUpdatesAvailable = useSelector(selectIsUpdatesAvailable);
  const isFocused = useIsFocused();
  const {show, ...snackBarProps} = useSnackbar();

  useOnRequestError(getHomeDataUpdatesRequest, 'home', errorLabel => {
    show({
      title: errorLabel.text,
      type: 'error',
    });
  });

  useAppState(checkUpdates);

  useFocusEffect(
    useCallback(
      () => () => {
        InteractionManager.runAfterInteractions(() => {
          dispatch(getHomeDataUpdateAvailableRequest());
        });
      },
      [dispatch],
    ),
  );

  return {
    loading,
    error,
    listRef,
    getInitialData,
    refreshing,
    getData,
    navigateToObjectDetails,
    onCategoryPress,
    onAllObjectsPress,
    navigateToCategoriesList,
    sendIsFavoriteChangedEvent,
    homeData,
    theme,
    isFocused,
    isUpdatesAvailable,
    snackBarProps,
  };
};
