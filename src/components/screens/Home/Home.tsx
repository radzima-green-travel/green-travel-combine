import React, {useEffect, useCallback} from 'react';
import {RefreshPageReminder, SuspenseView, useToast} from 'atoms';
import {HomeSectionBar} from 'organisms';
import {
  AppStateStatus,
  FlatList,
  InteractionManager,
  RefreshControl,
} from 'react-native';

import {styles} from './styles';
import {
  getHomeDataUpdatesRequest,
  getInitialHomeDataRequest,
  getHomeDataUpdateAvailableRequest,
  getHomeData,
} from 'core/reducers';
import {useDispatch, useSelector} from 'react-redux';
import {selectHomeData, selectIsUpdatesAvailable} from 'core/selectors';
import {
  useAppState,
  useRequestError,
  useRequestLoading,
  useTranslation,
  useColorScheme,
} from 'core/hooks';
import {IProps} from './types';
import {COLORS} from 'assets';
import {useFocusEffect} from '@react-navigation/core';
import {ErrorToast} from '../../molecules';

export const Home = ({navigation: {navigate}}: IProps) => {
  const {t} = useTranslation('home');
  const dispatch = useDispatch();
  const theme = useColorScheme();
  const homeData = useSelector(selectHomeData);
  const isUpdatesAvailable = useSelector(selectIsUpdatesAvailable);
  const {ref, show: showToast} = useToast();
  const getData = useCallback(() => {
    dispatch(getHomeDataUpdatesRequest());
  }, [dispatch]);

  const getInitialData = useCallback(() => {
    dispatch(getInitialHomeDataRequest());
  }, [dispatch]);

  const loading = useRequestLoading(getInitialHomeDataRequest);
  const {error} = useRequestError(getInitialHomeDataRequest);

  const refreshing = useRequestLoading(getHomeDataUpdatesRequest);
  const {error: updateError} = useRequestError(getHomeDataUpdatesRequest);

  useEffect(() => {
    if (updateError) {
      showToast();
    }
  }, [showToast, updateError]);

  useEffect(() => {
    dispatch(getHomeData());
  }, [dispatch]);

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

  const navigateToCategoriesList = useCallback(
    ({categoryId, title}: {categoryId: string; title: string}) => {
      navigate('CategoriesList', {categoryId, title});
    },
    [navigate],
  );

  const navigateToObjectDetails = useCallback(
    ({objectId}: {objectId: string}) => {
      navigate('ObjectDetails', {objectId});
    },
    [navigate],
  );

  return (
    <SuspenseView
      loading={loading}
      error={homeData ? null : error}
      retryCallback={getInitialData}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            tintColor={theme === 'light' ? COLORS.forestGreen : COLORS.white}
            colors={[COLORS.forestGreen]}
            refreshing={refreshing}
            onRefresh={getData}
          />
        }
        data={homeData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <HomeSectionBar
            onObjectPress={navigateToObjectDetails}
            onCategoryPress={navigateToObjectsList}
            onAllObjectsPress={navigateToObjectsList}
            onAllCategoriesPress={navigateToCategoriesList}
            item={item}
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
  );
};
