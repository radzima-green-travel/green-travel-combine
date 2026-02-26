import { useRef, useCallback } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSharedValue } from 'react-native-reanimated';

export function useMapWithBottomSheetControls() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetPositionIndex = useSharedValue(0);

  const snapToMapView = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const snapToListView = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(2);
  }, []);

  return {
    bottomSheetRef,
    bottomSheetPositionIndex,
    snapToMapView,
    snapToListView,
  };
}

export type MapWithBottomSheetControls = ReturnType<
  typeof useMapWithBottomSheetControls
>;
