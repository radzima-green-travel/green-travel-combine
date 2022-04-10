import React, {useEffect, useCallback} from 'react';
import {RefreshPageReminder, SuspenseView, useToast} from 'atoms';
import {HomeSectionBar} from 'organisms';
import {
  AppStateStatus,
  FlatList,
  InteractionManager,
  RefreshControl,
  View,
} from 'react-native';

import {themeStyles} from './styles';
import {
  getHomeDataUpdatesRequest,
  getInitialHomeDataRequest,
  getHomeDataUpdateAvailableRequest,
} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {selectHomeData, selectIsUpdatesAvailable} from 'core/selectors';
import {
  useAppState,
  useRequestError,
  useRequestLoading,
  useTranslation,
  useColorScheme,
  useThemeStyles,
  useHomeAnalytics,
} from 'core/hooks';
import {IProps} from './types';
import {COLORS} from 'assets';
import {useFocusEffect, useIsFocused} from '@react-navigation/core';
import {ErrorToast} from '../../molecules';
import {screenOptions} from './screenOptions';
import {IObject, ITransformedCategory} from 'core/types';

export const Home = ({navigation: {navigate}}: IProps) => {
  const {t} = useTranslation('home');
  const styles = useThemeStyles(themeStyles);
  const dispatch = useDispatch();
  const theme = useColorScheme();
  const homeData = useSelector(selectHomeData);
  const isUpdatesAvailable = useSelector(selectIsUpdatesAvailable);
  const {ref, show: showToast} = useToast();
  const isFocused = useIsFocused();

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

  useEffect(() => {
    if (updateError) {
      showToast();
    }
  }, [showToast, updateError]);

  const checkUpdates = useCallback(
    (state: AppStateStatus, prevState: AppStateStatus) => {
      if (state === 'active' && prevState === 'background') {
        dispatch(getHomeDataUpdateAvailableRequest());
      }
    },
    [dispatch],
  );

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
  return (
    <View style={{overflow: 'hidden', flex: 1}}>
      <SuspenseView
        loading={loading}
        error={homeData ? null : error}
        retryCallback={getInitialData}>
        <FlatList
          ref={listRef}
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl
              tintColor={theme === 'light' ? COLORS.forestGreen : COLORS.white}
              colors={[COLORS.forestGreen]}
              refreshing={refreshing && isFocused}
              onRefresh={getData}
            />
          }
          data={homeData}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <HomeSectionBar
              onObjectPress={navigateToObjectDetails}
              onCategoryPress={onCategoryPress}
              onAllObjectsPress={onAllObjectsPress}
              onAllCategoriesPress={navigateToCategoriesList}
              item={item}
              onObjectCardIsFavoriteChanged={sendIsFavoriteChangedEvent}
            />
          )}
        />
        {isUpdatesAvailable ? <RefreshPageReminder onPress={getData} /> : null}
        <ErrorToast
          ref={ref}
          text={
            updateError?.message?.textPaths
              ? t(updateError?.message?.textPaths)
              : ''
          }
        />
      </SuspenseView>
    </View>
  );
};

Home.screenOptions = screenOptions;
