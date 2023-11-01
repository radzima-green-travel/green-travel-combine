import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ImagesGalleryScreenRouteProps,
  ImagesGalleryScreenNavigationProps,
} from '../types';
import {useCallback, useState} from 'react';
import {hapticFeedbackService} from 'services/HapticFeedbackService';

export function useImagesGallery() {
  const {
    params: {images, initialIndex},
  } = useRoute<ImagesGalleryScreenRouteProps>();
  const [currentPage, setCurrentPage] = useState(initialIndex + 1);

  const navigation = useNavigation<ImagesGalleryScreenNavigationProps>();

  const setPage = useCallback(index => {
    setCurrentPage(index + 1);
  }, []);

  const closeGallery = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
