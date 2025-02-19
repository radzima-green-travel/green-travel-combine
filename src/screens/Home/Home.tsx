import React from 'react';
import {SuspenseView} from 'molecules/SuspenseView';
import {SnackBar} from 'atoms/SnackBar';
import {HomeSectionBar} from 'organisms/HomeSectionBar';
import {FlatList, RefreshControl} from 'react-native';

import {useThemeStyles} from 'core/hooks/useThemeStyles';
import {COLORS} from 'assets';
import {screenOptions} from './screenOptions';
import {useHome} from './hooks';
import {themeStyles} from './styles';

export const Home = () => {
  const styles = useThemeStyles(themeStyles);
  const {
    loading,
    errorTexts,
    listRef,
    refreshing,
    navigateToObjectDetails,
    onCategoryPress,
    onAllObjectsPress,
    navigateToCategoriesList,
    sendIsFavoriteChangedEvent,
    homeData,
    theme,
    getHomePageData,
    refreshHomePageData,
    snackBarProps,
  } = useHome();

  return (
    <SuspenseView
      loading={loading}
      error={errorTexts}
      retryCallback={getHomePageData}
      testID={'homeSuspenseView'}>
      <FlatList
        ref={listRef}
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            tintColor={theme === 'light' ? COLORS.forestGreen : COLORS.white}
            colors={[COLORS.forestGreen]}
            refreshing={refreshing}
            onRefresh={refreshHomePageData}
          />
        }
        data={homeData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <HomeSectionBar
            testID="homeSectionBar"
            onObjectPress={navigateToObjectDetails}
            onCategoryPress={onCategoryPress}
            onAllObjectsPress={onAllObjectsPress}
            onAllCategoriesPress={navigateToCategoriesList}
            item={item}
            onObjectCardIsFavoriteChanged={sendIsFavoriteChangedEvent}
          />
        )}
      />
      {/* {isUpdatesAvailable ? <RefreshPageReminder onPress={getData} /> : null} */}
      <SnackBar testID="snackBar" isOnTop {...snackBarProps} />
    </SuspenseView>
  );
};

Home.screenOptions = screenOptions;
