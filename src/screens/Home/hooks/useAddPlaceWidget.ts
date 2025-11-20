import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { HomeScreenNavigationProps } from '../types';
import { useBottomMenu, useOnRequestSuccess } from '../../../core/hooks';
import { submitNewPlaceFormRequest } from '../../../core/actions';

export const useAddNewPlaceWidget = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();

  const successBottomSheetProps = useBottomMenu();

  useOnRequestSuccess(submitNewPlaceFormRequest, () => {
    successBottomSheetProps.openMenu();
  });

  return {
    openAddNewPlacePage: useCallback(() => {
      navigation.navigate('AddNewPlace');
    }, [navigation]),
    successBottomSheetProps,
  };
};
