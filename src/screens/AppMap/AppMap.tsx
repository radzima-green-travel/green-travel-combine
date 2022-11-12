import React, {useLayoutEffect, useEffect} from 'react';
import {ClusterMap, ClusterMapShape, BottomMenu} from 'atoms';
import {createMarkerFromObject} from 'core/selectors';
import {StyleProp, View} from 'react-native';

import {styles, selectedPointStyle} from './styles';
import MapBox, {SymbolLayerStyle} from '@react-native-mapbox-gl/maps';
import {
  AppMapBottomMenu,
  AppMapBottomSearchMenu,
  AppMapFilters,
  AppMapButtons,
} from 'molecules';
import {useBackHandler} from 'core/hooks';

import {FeatureCollection, Point} from '@turf/helpers';

type SelecteMarker = ReturnType<typeof createMarkerFromObject>;

import {WINDOW_HEIGHT} from 'services/PlatformService';
import {useAppMap} from './hooks';

export const AppMap = () => {
  const {
    bounds,
    ignoreFitBounds,
    camera,
    selectedObject,
    openMenu,
    isMenuOpened,
    unselectObject,
    isSearchMenuOpened,
    closeSearchMenu,
    clearInput,
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
    bottom,
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
    mapFilters,
  } = useAppMap();

  useLayoutEffect(() => {
    if (bounds) {
      if (!ignoreFitBounds.current) {
        camera.current?.fitBounds(...bounds);
      } else {
        ignoreFitBounds.current = false;
      }
    }
  }, [bounds]);

  useEffect(() => {
    if (selectedObject) {
      openMenu();
    }
  }, [openMenu, selectedObject]);

  useBackHandler(() => {
    if (isMenuOpened()) {
      unselectObject();
      return true;
    }

    if (isSearchMenuOpened()) {
      closeSearchMenu();
      clearInput();
      return true;
    }

    return false;
  });

  return (
    <View style={styles.container}>
      <ClusterMap
        bounds={bounds}
        ref={map}
        cameraRef={camera}
        onRegionWillChange={unfocusUserLocation}
        onShapePress={onShapePress}
        onPress={onMapPress}>
        {userLocationProps.visible ? (
          <MapBox.UserLocation renderMode="native" {...userLocationProps} />
        ) : null}
        {markers ? (
          <ClusterMapShape
            ref={shapeSourceRef}
            onShapePress={fitToClusterLeaves}
            markers={markers}
          />
        ) : null}

        {selectedMarker ? (
          <MapBox.ShapeSource
            id={'selectedPointShapeSource'}
            shape={selectedMarker as FeatureCollection<Point>}>
            <MapBox.SymbolLayer
              id={'selectedPoint'}
              style={selectedPointStyle as StyleProp<SymbolLayerStyle>}
            />
          </MapBox.ShapeSource>
        ) : null}
      </ClusterMap>
      <BottomMenu onHideEnd={onMenuHideEnd} {...menuProps}>
        <AppMapBottomMenu
          data={selectedObject}
          bottomInset={bottom}
          onGetMorePress={navigateToObjectDetails}
        />
      </BottomMenu>

      <BottomMenu
        showDragIndicator={false}
        menuHeight={WINDOW_HEIGHT * 0.95}
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
