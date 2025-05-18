import {COLORS} from 'assets';
import {SnackBar} from 'atoms';
import {useThemeStyles} from 'core/hooks/useThemeStyles';
import {ChipsHorisontalList, SuspenseView} from 'molecules';
import React, {useRef} from 'react';
import {RefreshControl, ScrollView, View} from 'react-native';
import {
  PlacesYouWontFindWidget,
  RandomSpotWidget,
  SpotOfTheWeekWidget,
  AddNewPlaceWidget,
} from './components';
import {useHome} from './hooks';
import {themeStyles} from './styles';
import {useStatusBar, useColorScheme, useTranslation} from 'core/hooks';
import {useHomeHeader} from './screenOptions';
import {map} from 'lodash';
import {ICONS_MATCHER} from 'core/constants';
import {
  useOpenRandomObject,
  usePlaceOfTheWeek,
  usePlacesYouWontFindWidget,
  useAddPlaceWidget,
} from './hooks';
import {useScrollToTop} from '@react-navigation/native';
import {ObjectDetailsAddInfoSuccessMenu} from '../../components/organisms';

export const Home = () => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('home');
  const scheme = useColorScheme();
  const listRef = useRef<ScrollView>(null);
  const {pageListContainerProps} = useHomeHeader();
  useStatusBar(scheme);
  useScrollToTop(
    useRef({
      scrollToTop: () => {
        listRef.current?.scrollTo({y: 0, x: 0});
      },
    }),
  );

  const {
    loading,
    errorTexts,
    refreshing,
    onCategoryPress,
    homeData,
    theme,
    getHomePageData,
    refreshHomePageData,
    snackBarProps,
  } = useHome();

  const {openRandomObject} = useOpenRandomObject();
  const {placeOfTheWeek, openPlaceOfTheWeek, onFavoriteChanged} =
    usePlaceOfTheWeek();
  const {openPlacesPage} = usePlacesYouWontFindWidget();

  const {openAddNewPlacePage, successBottomSheetProps} = useAddPlaceWidget();

  const widgetsBlock = (
    <View style={styles.widgetGrid}>
      <View style={styles.widgetGridRightColumn}>
        <PlacesYouWontFindWidget onPress={openPlacesPage} />
        <RandomSpotWidget onPress={openRandomObject} />
      </View>
      <View style={styles.widgetGridLeftColumn}>
        {placeOfTheWeek && (
          <SpotOfTheWeekWidget
            onPress={openPlaceOfTheWeek}
            object={placeOfTheWeek}
            onFavoriteChanged={onFavoriteChanged}
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
          {...pageListContainerProps}
          contentContainerStyle={[
            pageListContainerProps.contentContainerStyle,
            styles.listContent,
          ]}>
          {widgetsBlock}
          <ChipsHorisontalList
            testID="mainCategories"
            title={t('categories')}
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
              title={t('routes')}
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
          <AddNewPlaceWidget
            style={styles.addNewPlaceWidget}
            onPress={openAddNewPlacePage}
          />
        </ScrollView>

        <SnackBar testID="snackBar" isOnTop {...snackBarProps} />
        <ObjectDetailsAddInfoSuccessMenu
          testID="addInfoSuccessMenu"
          addInfoSuccessMenuProps={successBottomSheetProps}
        />
      </SuspenseView>
    </View>
  );
};
