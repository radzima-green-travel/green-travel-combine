import React, {useEffect, useCallback} from 'react';
import {RefreshPageReminder, SuspenseView} from 'atoms';
import {HomeSectionBar} from 'organisms';
import {FlatList, InteractionManager, RefreshControl, View} from 'react-native';

import {getHomeDataUpdateAvailableRequest} from 'core/reducers';

import {useAppState} from 'core/hooks';
import {COLORS} from 'assets';
import {useFocusEffect} from '@react-navigation/core';
import {ErrorToast} from '../../components/molecules';
import {screenOptions} from './screenOptions';
import {useHome} from './hooks';

export const Home = () => {
  const {
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
  } = useHome();

  useEffect(() => {
    if (updateError) {
      showToast();
    }
  }, [showToast, updateError]);

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
