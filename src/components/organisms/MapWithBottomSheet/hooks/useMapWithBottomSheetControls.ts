import { useRef, useCallback } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { useSharedValue } from 'react-native-reanimated';

export function useMapWithBottomSheetControls() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const initialSnapIndex = 2;
  const currentSnapIndex = useSharedValue(initialSnapIndex);

  const snapToMapView = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const snapToListView = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(2);
  }, []);

  return {
    bottomSheetRef,
    initialSnapIndex,
    currentSnapIndex,
    snapToMapView,
    snapToListView,
  };
}

export type MapWithBottomSheetControls = ReturnType<
  typeof useMapWithBottomSheetControls
>;
