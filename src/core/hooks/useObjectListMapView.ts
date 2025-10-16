import {useSearchSelector} from './useSearchSelector';
import {
  selectAppLanguage,
  selectMapSearchObjects,
  selectSearchObjectsTotal,
  selectVisibleOnMapObjects,
} from 'core/selectors';
import {useDispatch, useSelector} from 'react-redux';
import {SearchObjectsRequestPayload} from 'core/actions';
import {useRequestLoading} from 'react-redux-help-kit';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useSearchActions} from './useSearchActions';
import {DEFAULT_LOCALE} from 'core/constants';

export function useObjectListMapView({
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

  const searchPayloadUpdated = useRef(true);

  const searchPayload = useMemo(() => {
    return {
      ...searchParameters,
      totals: searchResultsTotal,
    };
  }, [searchParameters, searchResultsTotal]);

  useEffect(() => {
    searchPayloadUpdated.current = true;
  }, [searchPayload]);

  useEffect(() => {
    if (isMapViewEnabled && searchPayloadUpdated.current) {
      dispatch(getMapSearchObjectsRequest(searchPayload));
      searchPayloadUpdated.current = false;
    }
  }, [
    dispatch,
    searchParameters,
    isMapViewEnabled,
    searchResultsTotal,
    getMapSearchObjectsRequest,
    searchPayload,
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
    isMapViewEnabled,
  };
}
