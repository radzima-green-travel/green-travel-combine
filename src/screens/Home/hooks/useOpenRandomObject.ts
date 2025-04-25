import {useRouter} from 'expo-router';
import {fetchNextRandomObjects, shiftRandomObjectList} from 'core/actions';
import {selectRandomObjectList} from 'core/selectors';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHomeAnalytics} from './useHomeAnalytics';

export const useOpenRandomObject = () => {
  const dispatch = useDispatch();
  const {navigate} = useRouter();

  const {sendMainScreenRandomPlaceViewEvent} = useHomeAnalytics();

  const randomObjects = useSelector(selectRandomObjectList);

  const openRandomObject = useCallback(() => {
    const currentRandomObject = randomObjects[0];
    if (currentRandomObject) {
      if (randomObjects.length === 1) {
        dispatch(fetchNextRandomObjects());
      } else {
        dispatch(shiftRandomObjectList());
      }

      navigate({
        pathname: '/object/[objectId]',
        params: {
          objectId: currentRandomObject.id,
          objcetCoverBlurhash: currentRandomObject.blurhash,
          objectCoverImageUrl: currentRandomObject.cover,
        },
      });

      const {analyticsMetadata} = currentRandomObject;

      sendMainScreenRandomPlaceViewEvent(
        analyticsMetadata.objectName,
        analyticsMetadata.categoryName,
      );
    }
  }, [dispatch, navigate, randomObjects, sendMainScreenRandomPlaceViewEvent]);

  return {openRandomObject};
};
