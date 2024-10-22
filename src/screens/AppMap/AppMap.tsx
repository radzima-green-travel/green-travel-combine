import React from 'react';
import {ClusterMap, ClusterMapShape, BottomMenu, SuspenseView} from 'atoms';
import {Keyboard, StyleProp, View} from 'react-native';

import {styles, selectedPointStyle} from './styles';
import {
  SymbolLayerStyle,
  ShapeSource,
  SymbolLayer,
  UserLocation,
  UserLocationRenderMode,
} from '@rnmapbox/maps';
import {
  AppMapBottomMenu,
  AppMapBottomSearchMenu,
  AppMapFilters,
  AppMapButtons,
} from 'molecules';

import {FeatureCollection, Point} from '@turf/helpers';

import {WINDOW_HEIGHT} from 'services/PlatformService';
import {useAppMap} from './hooks';
import {Portal} from '@gorhom/portal';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {SearchList} from 'components/organisms';
import {find} from 'lodash';
import {useStaticCallback} from 'react-redux-help-kit';

export const AppMap = () => {
  const {
    bounds,
    camera,
    selectedObject,
    closeSearchMenu,
    map,
    unfocusUserLocation,
    onShapePress,
    onMapPress,
    userLocationProps,
    markers,
    shapeSourceRef,
    fitToClusterLeaves,
    selectedMarker,
    onMenuHideEnd,
    menuProps,
    navigateToObjectDetails,
    searchMenuProps,
    onDeleteAllItems,
    onDeleteItem,
    inputValue,
    isHistoryVisible,
    data,
    onSearchItemPress,
    onTextChange,
    isUserLocationFocused,
    onShowLocationPress,
    openSearchMenuAndPersistData,
    onFilterSelect,
    resetFilters,
    selectedFilters,
    bottom,
    mapFilters,
    currentLocale,
    loading,
    errorTexts,
    getAppMapObjects,
    searchListProps,
  } = useAppMap();

  const onItemPressHandler = useStaticCallback(
    (objectId: string) => {
      const object = find(data, {id: objectId});

      Keyboard.dismiss();
      if (object) {
        setTimeout(() => {
          onSearchItemPress(object);
        }, 0);
      }
    },
    [data, onSearchItemPress],
  );

  const {
    searchSuspenseProps,
    searchHistorySuspenseProps,
    ...otherSearchListProps
  } = searchListProps;

  return (
    <SuspenseView
      error={errorTexts}
      loading={loading}
      testID={'AppMapSuspenseView'}
      retryCallback={getAppMapObjects}>
      {markers ? (
        <View style={styles.container}>
          <ClusterMap
            bounds={bounds}
            ref={map}
            cameraRef={camera}
            onRegionIsChanging={unfocusUserLocation}
            onShapePress={onShapePress}
            onPress={onMapPress}
            locale={currentLocale}
            testID={'clusterMap'}>
            {userLocationProps.visible ? (
              <UserLocation
                renderMode={UserLocationRenderMode.Native}
                {...userLocationProps}
              />
            ) : null}
            {markers ? (
              <ClusterMapShape
                ref={shapeSourceRef}
                onShapePress={fitToClusterLeaves}
                markers={markers}
              />
            ) : null}

            {selectedMarker ? (
              <ShapeSource
                id={'selectedPointShapeSource'}
                shape={selectedMarker as FeatureCollection<Point>}>
                <SymbolLayer
                  id={'selectedPoint'}
                  style={selectedPointStyle as StyleProp<SymbolLayerStyle>}
                />
              </ShapeSource>
            ) : null}
          </ClusterMap>
          <Portal>
            <BottomMenu
              testID={'bottomMenu'}
              onHideEnd={onMenuHideEnd}
              {...menuProps}>
              <AppMapBottomMenu
                testID={'appMapBottomMenu'}
                data={selectedObject}
                bottomInset={bottom}
                onGetMorePress={navigateToObjectDetails}
              />
            </BottomMenu>

            <BottomMenu
              onHideStart={Keyboard.dismiss}
              showDragIndicator={false}
              menuHeight={WINDOW_HEIGHT * 0.9}
              testID="bottomMenu"
              {...searchMenuProps}>
              <AppMapBottomSearchMenu
                testID={'appMapBottomSearchMenu'}
                onBackPress={closeSearchMenu}
                inputValue={inputValue}
                onTextChange={onTextChange}
                bottomInset={bottom}>
                <SuspenseView
                  testID={'appMapSuspenseView'}
                  cover
                  {...searchSuspenseProps}>
                  <SuspenseView
                    testID={'appMapSuspenseView'}
                    {...searchHistorySuspenseProps}>
                    <SearchList
                      FlatListComponent={BottomSheetFlatList}
                      onItemPress={onItemPressHandler}
                      onDeleteAllPress={onDeleteAllItems}
                      onDeletePress={onDeleteItem}
                      isHistoryVisible={isHistoryVisible}
                      data={data}
                      testID="searchList"
                      {...otherSearchListProps}
                    />
                  </SuspenseView>
                </SuspenseView>
              </AppMapBottomSearchMenu>
            </BottomMenu>
          </Portal>

          <AppMapButtons
            testID="appMapButtons"
            isUserLocationFocused={isUserLocationFocused}
            bottomMenuPosition={menuProps.animatedPosition}
            onShowLocationPress={onShowLocationPress}
            onSearchPress={openSearchMenuAndPersistData}
          />
          <AppMapFilters
            testID={'appMapFilters'}
            onFilterSelect={onFilterSelect}
            resetFilters={resetFilters}
            selectedFilters={selectedFilters}
            filters={mapFilters}
          />
        </View>
      ) : null}
    </SuspenseView>
  );
};
