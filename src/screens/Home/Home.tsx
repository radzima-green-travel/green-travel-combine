import {SnackBar} from 'atoms';
import {SuspenseView} from 'molecules';
import {HomeSectionBar} from 'organisms';
import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';

import {COLORS} from 'assets';
import {useThemeStyles} from 'core/hooks';
import {
  PlacesYouWontFindWidget,
  RandomSpotWidget,
  SpotOfTheWeekWidget,
} from './components';
import {useHome} from './hooks';
import {screenOptions} from './screenOptions';
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

  const spotOfTheWeekPlaceholderObject = homeData[3]?.items[0];

  const widgetsBlock = (
    <View style={styles.widgetGrid}>
      <View style={styles.widgetGridRightColumn}>
        <PlacesYouWontFindWidget />
        <RandomSpotWidget />
      </View>
      <View style={styles.widgetGridLeftColumn}>
        {spotOfTheWeekPlaceholderObject && (
          <SpotOfTheWeekWidget object={spotOfTheWeekPlaceholderObject} />
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SuspenseView
        loading={loading}
        error={errorTexts}
        retryCallback={getHomePageData}
        testID={'homeSuspenseView'}>
        <FlatList
          ListHeaderComponent={widgetsBlock}
          ref={listRef}
          style={styles.list}
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
    </View>
  );
};

Home.screenOptions = screenOptions;
