import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useScreenParams } from '@core/hooks/useScreenParams';
import { RouteScreenParams } from './params';
import { Header } from 'components/containers';
import { Button, Icon, ObjectListModeSwitch, SnackBar } from 'components/atoms';
import {
  ListItem,
  SuspenseView,
  AnimatedCircleButton,
} from 'components/molecules';
import { ObjectList } from 'components/organisms';
import { useTranslation } from 'core/hooks';
import { useRoute } from './hooks/useRoute';
import { RoutesEmptyListView } from '@features/routes/components';

export function RouteScreen() {
  const { id } = useScreenParams(RouteScreenParams);
  const { t } = useTranslation('routes');

  const {
    routeName,
    objects,
    objectsCount,
    loading,
    errorTexts,
    viewMode,
    searchObjects,
    handleAddObjectsPress,
    handleObjectPress,
    handleViewModeChange,
    snackbar,
    mapWithBottomSheetProps,
  } = useRoute(id);

  const renderHeader = useCallback(() => {
    return (
      <View className="pt-6">
        <ListItem
          testID="routeObjectsHeader"
          type="primary"
          title={`${t('routeDetails.common.objectsCount')} ${objectsCount}`}
          rightElement={
            <ObjectListModeSwitch
              testID="viewModeSwitch"
              selectedMode={viewMode}
              onPress={handleViewModeChange}
            />
          }
        />
        <View className="px-gutter pt-4 pb-4">
          <Button
            testID="addObjectsButton"
            theme="quarterly"
            withBorder={true}
            onPress={handleAddObjectsPress}
            text={t('routeDetails.common.addObjects')}
            renderIcon={textStyle => <Icon name="addLarge" style={textStyle} />}
            iconPosition="left"
            className="h-14 w-full"
          />
        </View>
      </View>
    );
  }, [objectsCount, viewMode, handleViewModeChange, handleAddObjectsPress, t]);

  if ((loading && !objectsCount) || errorTexts) {
    return (
      <SuspenseView
        testID="routeObjectsSuspense"
        loading={loading && !objectsCount}
        error={errorTexts ?? undefined}
        retryCallback={searchObjects}
      />
    );
  }

  return (
    <View className="bg-secondary flex-1">
      <Header
        testID="routeDetailHeader"
        style={{ paddingBottom: 0 }}
        topSlot={() => {
          return (
            <View className="flex-row items-center gap-3">
              <Header.BackButton />
              <View className="flex-1 items-center">
                <Header.Title size="small">{routeName}</Header.Title>
              </View>
              <AnimatedCircleButton
                testID="routeOptionsButton"
                icon={{ name: 'more' }}
                onPress={() => {
                  // TODO: Open route options menu
                }}
              />
            </View>
          );
        }}
        backButtonHidden={true}
      />
      <Header.PageContentWrapperWithOverlay>
        {!objectsCount ? (
          <RoutesEmptyListView
            testID="routesEmptyView"
            title={t('routeDetails.empty.title')}
            description={t('routeDetails.empty.description')}
            image="binoculars">
            <Button
              testID="addRouteButton"
              onPress={handleAddObjectsPress}
              text={t('routeDetails.empty.addRouteButtonLabel')}
              className="mt-4 self-center px-3"
            />
          </RoutesEmptyListView>
        ) : (
          <SuspenseView
            testID="routeObjectsSuspense"
            loading={
              mapWithBottomSheetProps?.isMapViewEnabled
                ? false
                : loading && !objectsCount
            }
            error={errorTexts}
            retryCallback={searchObjects}>
            <ObjectList
              testID="routeObjectsList"
              data={objects}
              totalResults={objectsCount}
              onItemPress={handleObjectPress}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
              ListHeaderComponent={renderHeader}
              mapWithBottomSheetProps={mapWithBottomSheetProps}
            />
          </SuspenseView>
        )}
      </Header.PageContentWrapperWithOverlay>
      <SnackBar
        {...snackbar}
        testID="routeScreenSnackBar"
        type="notification"
        leadIcon="routeSimple"
        offset={18}
      />
    </View>
  );
}
