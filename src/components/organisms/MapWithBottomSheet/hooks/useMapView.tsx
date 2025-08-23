import {
  useRef,
  useMemo,
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from 'react';

import {
  getMapMarkers,
  createSelectedMarkerFromObject,
} from 'core/transformators/appMap';
import {ObjectMap, SearchObject} from 'core/types';
import {every, isEqual} from 'lodash';
import {ShapeSource, Camera, MapView, MapState} from '@rnmapbox/maps';

import {useFocusToUserLocation} from 'core/hooks';

import {Feature, Position, Geometry} from '@turf/helpers';

import {mapService} from 'services/MapService';
import {find} from 'lodash';
import {hapticFeedbackService} from 'services/HapticFeedbackService';

import {ICarouselInstance} from 'react-native-reanimated-carousel';

const defaultBbox = [
  23.1994938494, 51.3195034857, 32.6936430193, 56.1691299506,
];

type OnPressEvent = {
  features: Array<GeoJSON.Feature>;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  point: {
    x: number;
    y: number;
  };
};

export const useMapView = ({
  mapObjects,
  onMarkersAppear,
  visibleObjects,
}: {
  mapObjects: ObjectMap[];
  visibleObjects: SearchObject[];
  onMarkersAppear: (
    markers: Array<Feature<Geometry, {icon_image: string; objectId: string}>>,
  ) => void;
}) => {
  const carouselRef = useRef<ICarouselInstance>(null);

  const camera = useRef<Camera>(null);
  const mapRef = useRef<MapView>(null);
  const shapeSourceRef = useRef<ShapeSource>(null);
  const ignoreFitBounds = useRef(false);

  const [selectedObject, setSelectedObject] = useState<null | ObjectMap>(null);

  const isObjectsEmpty = !mapObjects.length;

  const markers = useMemo(() => {
    return !isObjectsEmpty ? getMapMarkers(mapObjects) : null;
  }, [isObjectsEmpty, mapObjects]);

  const selectedMarker = useMemo(() => {
    return selectedObject
      ? createSelectedMarkerFromObject(selectedObject)
      : createSelectedMarkerFromObject(null);
  }, [selectedObject]);

  const bounds = useMemo(() => {
    return markers
      ? mapService.getBoundsFromGeoJSON(markers, {
          left: 30,
          right: 30,
          bottom: 250,
          top: 170,
        })
      : mapService.getBoundsFromBbox(defaultBbox, {});
  }, [markers]);

  const selectObject = useCallback(
    (objectId: string) => {
      hapticFeedbackService.trigger();
      const objectMap = find(mapObjects, {id: objectId});

      if (objectMap) {
        setSelectedObject({...objectMap});
      }
    },
    [mapObjects],
  );

  const preselectFirstMarkerFromVisibleObjects = useCallback(() => {
    if (visibleObjects.length > 0) {
      const firstVisibleObject = visibleObjects[0];
      const firstVisibleObjectId = firstVisibleObject.id;

      if (firstVisibleObjectId) {
        selectObject(firstVisibleObjectId);
      }
    }
  }, [selectObject, visibleObjects]);

  useEffect(() => {
    preselectFirstMarkerFromVisibleObjects();
  }, [preselectFirstMarkerFromVisibleObjects]);

  const prevVisible = useRef<Record<string, boolean> | null>(null);
  const unselectObject = useCallback(() => {
    setSelectedObject(null);
  }, []);

  const getVisibleFeatures = useCallback(
    async (bbox: number[]) => {
      if (!mapObjects.length) {
        return;
      }

      async function queryRenderedFeaturesInRect() {
        const data = (await mapRef.current?.queryRenderedFeaturesInRect(
          bbox as [number, number, number, number],
          [],
          ['singlePoint'],
        )) as ReturnType<typeof createSelectedMarkerFromObject>;

        if (data) {
          const {features} = data;

          const currentVisible = features.reduce(
            (acc, feature) => ({
              ...acc,
              [feature.properties.objectId]: true,
            }),
            {},
          );

          if (
            selectedObject &&
            (!features.length ||
              every(features, feature => {
                return feature.properties.objectId !== selectedObject?.id;
              }))
          ) {
            unselectObject();
          }

          if (!isEqual(currentVisible, prevVisible.current)) {
            prevVisible.current = currentVisible;
            onMarkersAppear(features);
          }
        }
      }

      queryRenderedFeaturesInRect();
    },
    [mapObjects.length, onMarkersAppear, selectedObject, unselectObject],
  );

  const onMapPress = useCallback(() => {
    unselectObject();
  }, [unselectObject]);

  const onCarouselSnap = useCallback(
    (index: number) => {
      const itemData = visibleObjects[index];
      if (itemData) {
        selectObject(itemData.id);
      }
    },
    [visibleObjects, selectObject],
  );

  const onShapePress = useCallback(
    async (objectId: string | null) => {
      if (objectId) {
        const itemData = find(mapObjects, {id: objectId});

        if (itemData) {
          selectObject(itemData.id);

          carouselRef.current?.scrollTo({
            index: visibleObjects.findIndex(({id}) => id === itemData.id),
            animated: true,
          });
        }
      }
    },
    [mapObjects, selectObject, visibleObjects],
  );

  const {
    focusToUserLocation,
    setIsUserLocationFocused,
    isUserLocationFocused,
    ...userLocationProps
  } = useFocusToUserLocation(camera);

  const fitToClusterLeaves = useCallback((event: OnPressEvent) => {
    const {features} = event;
    const isCluster = features[0]?.properties?.cluster;

    if (isCluster) {
      const cluster = features[0] as GeoJSON.Feature<
        GeoJSON.Point,
        {cluster_id: number}
      >;
      const {
        geometry: {coordinates},
      } = cluster;

      shapeSourceRef.current?.getClusterExpansionZoom(cluster).then(zoom => {
        camera.current?.setCamera({
          centerCoordinate: coordinates as Position,
          zoomLevel: zoom,
          animationDuration: 200,
        });
      });
    }
  }, []);

  const onShowLocationPress = useCallback(async () => {
    const currentZoom = (await mapRef.current?.getZoom()) || null;

    focusToUserLocation(bounds, currentZoom);
  }, [bounds, focusToUserLocation]);

  const unfocusUserLocation = useCallback(
    ({gestures: {isGestureActive}}: MapState) => {
      if (isGestureActive) {
        setIsUserLocationFocused(false);
      }
    },
    [setIsUserLocationFocused],
  );

  useLayoutEffect(() => {
    if (bounds) {
      if (!ignoreFitBounds.current) {
        camera.current?.fitBounds(...bounds);
      } else {
        ignoreFitBounds.current = false;
      }
    }
  }, [bounds, camera, ignoreFitBounds]);

  return {
    bounds,
    camera,
    mapRef,
    unfocusUserLocation,
    onShapePress,
    onMapPress,
    userLocationProps,
    markers,

    shapeSourceRef,

    fitToClusterLeaves,

    isUserLocationFocused,
    onShowLocationPress,

    onCarouselSnap,
    carouselRef,

    selectedMarker,
    selectedObject,
    visibleObjects,
    getVisibleFeatures,
    unselectObject,
  };
};
