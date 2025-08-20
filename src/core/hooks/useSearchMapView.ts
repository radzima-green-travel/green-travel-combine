import {useSearchSelector} from './useSearchSelector';
import {
  selectAppLanguage,
  selectMapSearchObjects,
  selectSearchObjectsTotal,
  selectVisibleOnMapObjects,
} from 'core/selectors';
import {useDispatch} from 'react-redux';
import {SearchObjectsRequestPayload} from 'core/actions';
import {useRequestLoading} from 'react-redux-help-kit';
import {useCallback, useEffect, useState} from 'react';
import {useSearchActions} from './useSearchActions';
import {useSelector} from 'react-redux';
import {DEFAULT_LOCALE} from 'core/constants';

export function useSearchMapView({
  searchParameters,
}: {
  searchParameters: SearchObjectsRequestPayload;
}) {
  const {getMapSearchObjectsRequest, getVisibleOnMapObjectsRequest} =
    useSearchActions();
  const mapObjects = useSearchSelector(selectMapSearchObjects);

  const appLocale = useSelector(selectAppLanguage);

  const dispatch = useDispatch();
  const searchResultsTotal = useSearchSelector(selectSearchObjectsTotal);

  const visibleObjectsOnMap = useSearchSelector(selectVisibleOnMapObjects);
  const [isMapViewEnabled, setIsMapViewEnabled] = useState(false);

  const {loading: getMapSearchObjectsPending} = useRequestLoading(
    getMapSearchObjectsRequest,
  );
  const {loading: getVisibleObjectsPending} = useRequestLoading(
    getVisibleOnMapObjectsRequest,
  );

  useEffect(() => {
    if (isMapViewEnabled) {
      dispatch(
        getMapSearchObjectsRequest({
          ...searchParameters,
          totals: searchResultsTotal,
        }),
      );
    }
  }, [
    dispatch,
    searchParameters,
    isMapViewEnabled,
    searchResultsTotal,
    getMapSearchObjectsRequest,
  ]);

  const updateMapViewVisibility = useCallback((index: number) => {
    setIsMapViewEnabled(index <= 1);
  }, []);

  const getVisibleOnMapObjects = useCallback(
    markers => {
      const objectIds = markers.map(marker => marker.properties.objectId);
      dispatch(getVisibleOnMapObjectsRequest({objectIds: objectIds}));
    },
    [dispatch, getVisibleOnMapObjectsRequest],
  );

  return {
    totalResults: searchResultsTotal,
    loading: getMapSearchObjectsPending || getVisibleObjectsPending,
    currentLocale: appLocale || DEFAULT_LOCALE,
    onMenuPositionChange: updateMapViewVisibility,
    mapObjects,
    visibleObjectsOnMap,
    onMarkersAppear: getVisibleOnMapObjects,
  };
}
