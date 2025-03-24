import {COLORS} from 'assets';
import {SnackBar} from 'atoms';
import {useThemeStyles} from 'core/hooks/useThemeStyles';
import {ChipsHorisontalList, SuspenseView} from 'molecules';
import React from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
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
import {map} from 'lodash';
import {ICONS_MATCHER} from 'core/constants';

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
            onFavoriteChanged={sendIsFavoriteChangedEvent}
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
        <ScrollView
          style={styles.list}
          ref={listRef}
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
          {...pageListContainerProps}>
          {widgetsBlock}
          <ChipsHorisontalList
            testID="mainCategories"
            title="Categories"
            numberOfRows={2}
            items={map(homeData.main, category => ({
              text: category.name,
              leftIcon: ICONS_MATCHER[category.icon],
              iconSize: 24,
              onPress: () => {
                onCategoryPress(category);
              },
            }))}
          />

          {homeData.routes.length ? (
            <ChipsHorisontalList
              testID="routesCategories"
              title="Routes"
              items={map(homeData.routes, category => ({
                text: category.name,
                leftIcon: ICONS_MATCHER[category.icon],
                iconSize: 24,
                onPress: () => {
                  onCategoryPress(category);
                },
              }))}
            />
          ) : null}
        </ScrollView>

        <SnackBar testID="snackBar" isOnTop {...snackBarProps} />
      </SuspenseView>
    </View>
  );
};
