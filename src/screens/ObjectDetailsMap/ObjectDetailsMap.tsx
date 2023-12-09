import React from 'react';
import {BottomMenu, ClusterMap} from 'atoms';
import {StyleProp, View} from 'react-native';

import {
  FillLayerStyle,
  LineLayerStyle,
  SymbolLayerStyle,
  ShapeSource,
  LineLayer,
  UserLocation,
  UserLocationRenderMode,
  FillLayer,
  SymbolLayer,
  Images,
} from '@rnmapbox/maps';
import {useThemeStyles} from 'core/hooks';
import {
  BackCircleButton,
  ObjectDetailsMapButtons,
  ObjectDetailsMapBottomMenu,
} from 'molecules';

import {FeatureCollection, LineString, Point} from '@turf/helpers';
import {useObjectDetailsMap} from './hooks';
import {themeLayerStyles} from './styles';

const mapPin = require('assets/images/map-pin.png');

const images = {
  mapPin,
};

export const ObjectDetailsMap = () => {
  const {
    bottom,
    camera,
    data,
    unfocusUserLocation,
    onMarkerPress,
    bounds,
    map,
    userLocationProps,
    menuProps,
    onShowLocationPress,
    isUserLocationFocused,
    onMenuButtonPress,
    loading,
    isDirectionShowed,
    onBackPress,
    centerCoordinate,
    direction,
    dataShapeSource,
    belongsToSubtitle,
    currentLocale,
  } = useObjectDetailsMap();

  const layersStyles = useThemeStyles(themeLayerStyles, {
    disableStyleSheet: true,
  });

  return (
    <View style={{flex: 1}}>
      <ClusterMap
        attributionPosition={{bottom: 40, right: 30}}
        centerCoordinate={centerCoordinate}
        onRegionIsChanging={unfocusUserLocation}
        onShapePress={onMarkerPress}
        bounds={bounds}
        ref={map}
        cameraRef={camera}
        locale={currentLocale}>
        {userLocationProps.visible ? (
          <UserLocation
            renderMode={UserLocationRenderMode.Native}
            minDisplacement={10}
            {...userLocationProps}
          />
        ) : null}

        {direction ? (
          <ShapeSource
            id="directionSource"
            shape={direction as unknown as LineString}>
            <LineLayer
              id="directionFillBackground"
              belowLayerID="singlePoint"
              style={
                layersStyles.directionBackground as StyleProp<LineLayerStyle>
              }
            />
            <LineLayer
              id="directionFill"
              belowLayerID="singlePoint"
              style={layersStyles.direction as StyleProp<LineLayerStyle>}
            />
          </ShapeSource>
        ) : null}

        {data?.area ? (
          <ShapeSource id="area" shape={data?.area}>
            <FillLayer
              id="areaFill"
              style={layersStyles.area as StyleProp<FillLayerStyle>}
            />
            <LineLayer
              id="areaStroke"
              style={layersStyles.areaStroke as StyleProp<LineLayerStyle>}
            />
          </ShapeSource>
        ) : null}

        {data?.routes ? (
          <ShapeSource id="routeSource" shape={data?.routes}>
            <LineLayer
              id="routeFill"
              style={layersStyles.route as StyleProp<LineLayerStyle>}
            />
          </ShapeSource>
        ) : null}

        {dataShapeSource ? (
          <>
            <Images images={images} />
            <ShapeSource
              id="objectPinSource"
              shape={dataShapeSource as FeatureCollection<Point>}>
              <SymbolLayer
                id="singlePoint"
                style={
                  layersStyles.objectDetailsPin as StyleProp<SymbolLayerStyle>
                }
              />
            </ShapeSource>
          </>
        ) : null}
      </ClusterMap>
      <ObjectDetailsMapButtons
        bottomMenuPosition={menuProps.animatedPosition}
        onShowLocationPress={onShowLocationPress}
        isUserLocationFocused={isUserLocationFocused}
        botttomInset={bottom}
      />
      <BottomMenu {...menuProps}>
        <ObjectDetailsMapBottomMenu
          data={data}
          belongsToSubtitle={belongsToSubtitle}
          onHideEnd={() => {}}
          bottomInset={bottom}
          onButtonPress={onMenuButtonPress}
          loading={loading}
          isDirectionShowed={!!isDirectionShowed}
        />
      </BottomMenu>
      <BackCircleButton onPress={onBackPress} />
    </View>
  );
};
