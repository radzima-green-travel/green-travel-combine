import {useCallback, useMemo, useState} from 'react';
import {hapticFeedbackService} from 'services/HapticFeedbackService';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useObjectDetailsSelector} from 'core/hooks';
import {selectObjectDetails} from 'core/selectors';
import {toFinite} from 'lodash';
import {RouteQueryParams} from 'core/types';

export function useImagesGallery() {
  const params = useLocalSearchParams<RouteQueryParams.ImageGallery>();

  const initialIndex = toFinite(params.initialIndex);

  const objectData = useObjectDetailsSelector(selectObjectDetails);

  const images = useMemo(() => objectData?.images ?? [], [objectData]);

  const [currentPage, setCurrentPage] = useState(initialIndex + 1);

  const router = useRouter();

  const setPage = useCallback(index => {
    setCurrentPage(index + 1);
  }, []);

  const closeGallery = useCallback(() => {
    router.back();
  }, [router]);

  const triggerHapticFeedback = useCallback((scale: number) => {
    if (scale < 1) {
      hapticFeedbackService.trigger();
    }
  }, []);

  return {
    images,
    initialIndex,
    closeGallery,
    currentPage,
    setPage,
    triggerHapticFeedback,
  };
}
