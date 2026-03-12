import React, { useCallback } from 'react';
import { View } from 'react-native';
import { Header } from 'components/containers';
import { Button, ObjectListModeSwitch, SnackBar } from 'components/atoms';
import { ListItem, SuspenseView } from 'components/molecules';
import { ObjectList } from 'components/organisms';
import { useHeader, useTranslation } from 'core/hooks';
import { useRoute } from './hooks/useRoute';
import {
  AddObjectsSlot,
  RoutesEmptyListView,
} from '@features/routes/components';

export function RouteScreen() {
  const { t } = useTranslation('routes');

  const {
    routeName,
    objects,
    objectsCount,
    loading,
    errorTexts,
    viewMode,
    searchObjects,
    onAddObjectsPress,
    onObjectPress,
    onViewModeChange,
    snackbar,
    mapWithBottomSheetProps,
  } = useRoute();

  useHeader(
    {
      title: routeName,
      titleSize: 'small',
      titleAlign: 'center',
      rightActions: [
        {
          icon: 'more',
          action: () => {
            // TODO: Open route options menu
          },
        },
      ],
    },
    [routeName],
  );

  const renderHeader = useCallback(() => {
    return (
      <View className="pt-6">
        <ListItem
          testID="routeObjectsHeader"
          type="primary"
          title={t('routeDetails.common.objectsCount', { count: objectsCount })}
          rightElement={
            <ObjectListModeSwitch
              testID="viewModeSwitch"
              selectedMode={viewMode}
              onPress={onViewModeChange}
            />
          }
        />
      </View>
    );
  }, [t, objectsCount, viewMode, onViewModeChange]);

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
      <Header.PageContentWrapperWithOverlay>
        {!objectsCount ? (
          <RoutesEmptyListView
            testID="routesEmptyView"
            title={t('routeDetails.empty.title')}
            description={t('routeDetails.empty.description')}
            image="binoculars">
            <Button
              testID="addRouteButton"
              onPress={onAddObjectsPress}
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
              onItemPress={onObjectPress}
              viewMode={viewMode}
              onViewModeChange={onViewModeChange}
              ListHeaderComponent={renderHeader}
              mapWithBottomSheetProps={mapWithBottomSheetProps}
              prependedCardSlot={
                <AddObjectsSlot
                  onPress={onAddObjectsPress}
                  viewMode={viewMode}
                />
              }
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
