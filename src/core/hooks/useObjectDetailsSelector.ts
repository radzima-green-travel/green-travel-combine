import {useLocalSearchParams} from 'expo-router';
import {useCurrentDataSelector} from 'react-redux-help-kit';

export const useObjectDetailsSelector = <
  T extends (state: any, id: string) => any,
>(
  selector: T,
) => {
  const {objectId} = useLocalSearchParams<'/object/[objectId]'>();

  return useCurrentDataSelector(selector, {
    reducerId: objectId,
    reduxStateBranchName: 'objectDetails',
  });
};
