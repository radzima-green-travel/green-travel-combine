import React, {useEffect} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
const {MapView, Camera} = MapboxGL;

export const AppMap = () => {
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
  }, []);

  return (
    <MapView style={{flex: 1}}>
      <Camera
        bounds={{
          ne: [23.1994938494, 51.3195034857],
          sw: [32.6936430193, 56.1691299506],
          paddingLeft: 30,
          paddingRight: 30,
        }}
      />
    </MapView>
  );
};
