import React, {useRef, useState, useEffect, useCallback} from 'react';
import {ClusterMap, ClusterMapShape} from 'atoms';
import {
  selectMapMarkers,
  selectBounds,
  selectSelectedMapMarker,
  createMarkerFromObject,
} from 'core/selectors';
import {useSelector} from 'react-redux';
import {View} from 'react-native';

import {Portal} from 'atoms';
import {styles, selectedPointStyle} from './styles';
import {IExtendedObjectWithCategoryData} from 'core/types';
import MapBox from '@react-native-mapbox-gl/maps';
import {AppMapBottomMenu, AppMapBottomMenuRef} from 'molecules';
import {useToggleFavorite, useDarkStatusBar} from 'core/hooks';
import {IState} from 'core/store';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type SelecteMarker = ReturnType<typeof createMarkerFromObject>;

export const AppMap = () => {
  const bounds = useSelector(selectBounds);

  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<SelecteMarker | null>(
    () => createMarkerFromObject(null),
  );

  const selected = useSelector((state: IState) =>
    selectSelectedMapMarker(state, selectedMarkerId),
  );

  const {bottom} = useSafeAreaInsets();

  const markers = useSelector(selectMapMarkers);

  const bottomMenu = useRef<AppMapBottomMenuRef>(null);

  useEffect(() => {
    if (selected) {
      setSelectedMarker(createMarkerFromObject(selected));
      bottomMenu.current?.show();
    }
  }, [selected]);

  const onPress = useCallback(
    (data: IExtendedObjectWithCategoryData | null) => {
      if (data) {
        setSelectedMarkerId(data._id);
      } else {
        setSelectedMarker(createMarkerFromObject(null));
        bottomMenu.current?.hide();
      }
    },
    [],
  );

  const onMenuHideEnd = useCallback(() => {
    setSelectedMarkerId(null);
  }, []);

  const toggleFavorite = useToggleFavorite();
  useDarkStatusBar();
  return (
    <View style={styles.container}>
      <ClusterMap onPress={onPress} bounds={bounds}>
        <ClusterMapShape markers={markers} />

        <MapBox.ShapeSource
          id={'selectedPointShapeSource'}
          shape={selectedMarker}>
          <MapBox.SymbolLayer id={'selectedPoint'} style={selectedPointStyle} />
        </MapBox.ShapeSource>
      </ClusterMap>
      <Portal>
        <AppMapBottomMenu
          onIsFavoritePress={toggleFavorite}
          data={selected}
          ref={bottomMenu}
          onHideEnd={onMenuHideEnd}
          bottomInset={bottom}
        />
      </Portal>
    </View>
  );
};
