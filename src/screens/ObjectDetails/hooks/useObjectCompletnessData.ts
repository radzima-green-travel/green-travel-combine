import {
  useObject,
  useTranslation,
  useHeaderHeight,
  useScrollScrollViewScrollToElement,
} from 'core/hooks';
import {map} from 'lodash';
import {useMemo} from 'react';
import {View} from 'react-native';
import Animated from 'react-native-reanimated';

export function useObjectCompletnessData({objectId}: {objectId: string}) {
  const {t} = useTranslation('common');
  const objectData = useObject(objectId);

  const headerHeight = useHeaderHeight();
  const {scrollRef, elementRef, scrollToElement} =
    useScrollScrollViewScrollToElement<View, Animated.ScrollView>(
      headerHeight * 2,
    );

  const incompleteFields = useMemo(() => {
    if (!objectData) {
      return [];
    }

    return map(objectData.category.imcompletedFieldsNames, fieldName => {
      return {id: fieldName, label: t(`objectFieldsLables.${fieldName}`)};
    });
  }, [objectData, t]);

  return {
    incompleteFields,
    percentage: objectData?.category.percentageOfCompletion || 0,
    scrollRef,
    elementRef,
    scrollToElement,
    isCompletnessBlockVisible: Boolean(incompleteFields.length),
  };
}
