import {
  useObject,
  useHeaderHeight,
  useScrollScrollViewScrollToElement,
  useObjectIncompleteFields,
} from 'core/hooks';

import {View} from 'react-native';
import Animated from 'react-native-reanimated';
import {useObjectDetailsAnalytics} from './useObjectDetailsAnalytics';
import {useCallback} from 'react';

export function useObjectCompletnessData({objectId}: {objectId: string}) {
  const objectData = useObject(objectId);
  const headerHeight = useHeaderHeight();
  const {sendAddInfoBannerClickEvent} = useObjectDetailsAnalytics();

  const {scrollRef, elementRef, scrollToElement} =
    useScrollScrollViewScrollToElement<View, Animated.ScrollView>(
      headerHeight * 2,
    );
  const incompleteFields = useObjectIncompleteFields(
    objectData?.category.incompleteFieldsNames ?? [],
  );

  const scrollToElementHandler = useCallback(() => {
    sendAddInfoBannerClickEvent();
    scrollToElement();
  }, [scrollToElement, sendAddInfoBannerClickEvent]);

  return {
    incompleteFields,
    percentage: objectData?.category.percentageOfCompletion || 0,
    scrollRef,
    elementRef,
    scrollToElement: scrollToElementHandler,
    isCompletnessBlockVisible: Boolean(incompleteFields.length),
  };
}
