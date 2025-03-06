import {useNavigation} from '@react-navigation/native';
import {fetchNextRandomObjects, shiftRandomObjectList} from 'core/actions';
import {selectRandomObjectList} from 'core/selectors';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HomeScreenNavigationProps} from '../types';

export const useOpenRandomObject = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation<HomeScreenNavigationProps>();

  const randomObjects = useSelector(selectRandomObjectList);

  return useCallback(() => {
    const currentRandomObject = randomObjects[0];

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
  }, [dispatch, navigate, randomObjects]);
};
