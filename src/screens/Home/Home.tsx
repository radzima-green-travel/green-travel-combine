import React from 'react';
import {RefreshPageReminder, SuspenseView, SnackBar} from 'atoms';
import {HomeSectionBar} from 'organisms';
import {FlatList, RefreshControl, View} from 'react-native';

import {useThemeStyles} from 'core/hooks';
import {COLORS} from 'assets';
import {screenOptions} from './screenOptions';
import {useHome} from './hooks';
import {themeStyles} from './styles';

export const Home = () => {
  const styles = useThemeStyles(themeStyles);
  const {
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
  } = useHome();

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
        <SnackBar isOnTop {...snackBarProps} />
      </SuspenseView>
    </View>
  );
};

Home.screenOptions = screenOptions;
