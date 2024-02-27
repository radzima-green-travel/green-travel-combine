import {
  useObject,
  useHeaderHeight,
  useScrollScrollViewScrollToElement,
  useObjectIncompleteFields,
} from 'core/hooks';

import {View} from 'react-native';
import Animated from 'react-native-reanimated';

export function useObjectCompletnessData({objectId}: {objectId: string}) {
  const objectData = useObject(objectId);
  const headerHeight = useHeaderHeight();
  const {scrollRef, elementRef, scrollToElement} =
    useScrollScrollViewScrollToElement<View, Animated.ScrollView>(
      headerHeight * 2,
    );
  const incompleteFields = useObjectIncompleteFields(
    objectData?.category.imcompletedFieldsNames ?? [],
  );

  return {
    incompleteFields,
    percentage: objectData?.category.percentageOfCompletion || 0,
    scrollRef,
    elementRef,
    scrollToElement,
    isCompletnessBlockVisible: Boolean(incompleteFields.length),
  };
}
