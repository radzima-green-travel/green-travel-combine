import React from 'react';
import {ClusterMap, ClusterMapShape, BottomMenu} from 'atoms';
import {StyleProp, View} from 'react-native';

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
import {TestIDs} from 'core/types';

import {WINDOW_HEIGHT} from 'services/PlatformService';
import {useAppMap} from './hooks';

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
  } = useAppMap();

  return (
    <View style={styles.container}>
      <ClusterMap
        bounds={bounds}
        ref={map}
        cameraRef={camera}
        onRegionIsChanging={unfocusUserLocation}
        onShapePress={onShapePress}
        onPress={onMapPress}
        locale={currentLocale}
        testID={TestIDs.MapOverview}>
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
      <BottomMenu
        testID={TestIDs.AppMapSearchBottomMenu}
        onHideEnd={onMenuHideEnd}
        {...menuProps}>
        <AppMapBottomMenu
          data={selectedObject}
          bottomInset={bottom}
          onGetMorePress={navigateToObjectDetails}
        />
      </BottomMenu>

      <BottomMenu
        showDragIndicator={false}
        menuHeight={WINDOW_HEIGHT * 0.9}
        testID={TestIDs.AppMapObjectBottomMenu}
        {...searchMenuProps}>
        <AppMapBottomSearchMenu
          onBackPress={closeSearchMenu}
          onDeleteAllPress={onDeleteAllItems}
          onDeletePress={onDeleteItem}
          inputValue={inputValue}
          isHistoryVisible={isHistoryVisible}
          data={data}
          onItemPress={onSearchItemPress}
          onTextChange={onTextChange}
          bottomInset={bottom}
        />
      </BottomMenu>

      <AppMapButtons
        isUserLocationFocused={isUserLocationFocused}
        bottomMenuPosition={menuProps.animatedPosition}
        onShowLocationPress={onShowLocationPress}
        onSearchPress={openSearchMenuAndPersistData}
      />
      <AppMapFilters
        onFilterSelect={onFilterSelect}
        resetFilters={resetFilters}
        selectedFilters={selectedFilters}
        filters={mapFilters}
      />
    </View>
  );
};
