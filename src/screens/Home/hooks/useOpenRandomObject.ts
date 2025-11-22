import { useNavigation } from '@react-navigation/native';
import { fetchNextRandomObjects, shiftRandomObjectList } from 'core/actions';
import { selectRandomObjectList } from 'core/selectors';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeScreenNavigationProps } from '../types';
import { useHomeAnalytics } from './useHomeAnalytics';
export const useOpenRandomObject = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation<HomeScreenNavigationProps>();

  const { sendMainScreenRandomPlaceViewEvent } = useHomeAnalytics();

  const randomObjects = useSelector(selectRandomObjectList);
  const openRandomObject = useCallback(() => {
    const currentRandomObject = randomObjects[0];
    if (currentRandomObject) {
      if (randomObjects.length === 1) {
        dispatch(fetchNextRandomObjects());
      } else {
        dispatch(shiftRandomObjectList());
      }

      navigate('ObjectDetails', {
        objectId: currentRandomObject.id,
        objcetCoverBlurhash: currentRandomObject.blurhash,
        objectCoverImageUrl: currentRandomObject.cover,
      });
      const { analyticsMetadata } = currentRandomObject;
      sendMainScreenRandomPlaceViewEvent(
        analyticsMetadata.objectName,
        analyticsMetadata.categoryName,
      );
    }
  }, [dispatch, navigate, randomObjects, sendMainScreenRandomPlaceViewEvent]);

  return { openRandomObject };
};
