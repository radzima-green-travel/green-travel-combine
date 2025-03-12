import {COLORS} from 'assets';
import {SnackBar} from 'atoms';
import {useThemeStyles} from 'core/hooks/useThemeStyles';
import {SuspenseView} from 'molecules';
import {HomeSectionBar} from 'organisms';
import React from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {
  PlacesYouWontFindWidget,
  RandomSpotWidget,
  SpotOfTheWeekWidget,
} from './components';
import {useHome} from './hooks';
import {themeStyles} from './styles';
import {useStatusBar, useColorScheme} from 'core/hooks';
import {useHomeHeader} from './screenOptions';
import {useOpenRandomObject} from './hooks/useOpenRandomObject';
import {usePlaceOfTheWeek} from './hooks/usePlaceOfTheWeek';

export const Home = () => {
  const styles = useThemeStyles(themeStyles);
  const scheme = useColorScheme();

  const {pageListContainerProps} = useHomeHeader();
  useStatusBar(scheme);

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

  const openRandomObject = useOpenRandomObject();
  const {placeOfTheWeek} = usePlaceOfTheWeek();

  const widgetsBlock = (
    <View style={styles.widgetGrid}>
      <View style={styles.widgetGridRightColumn}>
        <PlacesYouWontFindWidget />
        <RandomSpotWidget onPress={openRandomObject} />
      </View>
      <View style={styles.widgetGridLeftColumn}>
        {placeOfTheWeek && (
          <SpotOfTheWeekWidget
            onPress={navigateToObjectDetails}
            object={placeOfTheWeek}
          />
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
          ref={listRef}
          {...pageListContainerProps}
          style={styles.list}
          keyboardShouldPersistTaps="handled"
          ListHeaderComponent={widgetsBlock}
          refreshControl={
            <RefreshControl
              tintColor={theme === 'light' ? COLORS.forestGreen : COLORS.white}
              colors={[COLORS.forestGreen]}
              refreshing={refreshing}
              onRefresh={refreshHomePageData}
              progressViewOffset={
                pageListContainerProps.contentContainerStyle.paddingTop
              }
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
