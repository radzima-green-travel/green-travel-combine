import React, {useRef, useState, useEffect, useCallback} from 'react';
import {ClusterMap, ClusterMapShape, Icon} from 'atoms';
import {selectMapMarkers, selectBounds, selectMarker} from 'core/selectors';
import {useSelector} from 'react-redux';
import {View, Text} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {Button as CustomButton, Portal} from 'atoms';
import {styles} from './styles';
import {IObject} from 'core/types';
import MapBox from '@react-native-mapbox-gl/maps';
const selectedPointStyle = {
  iconImage: ['get', 'icon_image'],
  iconSize: 1,
  iconAllowOverlap: true,
};

export const AppMap = () => {
  const bounds = useSelector(selectBounds);
  const [selected, setSelected] = useState<IObject | null>(null);
  const markers = useSelector(selectMapMarkers);
  const selectedMarker = useSelector(() => selectMarker(selected));
  const bs = useRef<BottomSheet>(null);
  const rendnerInner = () => {
    return (
      <View style={styles.bottomMenuContainer}>
        <Text style={styles.bottomMenuText}>{selected?.name}</Text>
        <CustomButton>Узнать больше</CustomButton>
      </View>
    );
  };
  useEffect(() => {
    if (selected) {
      bs.current?.snapTo(1);
    }
  }, [selected]);

  const onPress = useCallback((data) => {
    if (data) {
      setSelected(data);
    } else {
      bs.current?.snapTo(0);
    }
  }, []);

  return (
    <View style={styles.container}>
      <ClusterMap onPress={onPress} bounds={bounds}>
        {/* {selected ? (
          <MapBox.PointAnnotation
            id="selectedPoint"
            coordinate={selected.location.coordinates}>
            <Icon
              name={DARK_ICONS_MATCHER[selected.icon]}
              width={50}
              height={50}
            />
          </MapBox.PointAnnotation>
        ) : null} */}
        <ClusterMapShape markers={markers} />

        <MapBox.ShapeSource
          id={'selectedPointShapeSource'}
          shape={selectedMarker}>
          <MapBox.SymbolLayer id={'selectedPoint'} style={selectedPointStyle} />
        </MapBox.ShapeSource>
      </ClusterMap>
      <Portal>
        <BottomSheet
          onCloseEnd={() => {
            setSelected(null);
          }}
          borderRadius={15}
          ref={bs}
          snapPoints={[0, 150]}
          renderContent={rendnerInner}
          initialSnap={0}
          enabledGestureInteraction={false}
        />
      </Portal>
    </View>
  );
};
