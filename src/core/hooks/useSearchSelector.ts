import {useCurrentDataSelector} from 'react-redux-help-kit';
import {useRoute} from '@react-navigation/native';

export const useSearchSelector = <T extends (state: any, id: string) => any>(
  selector: T,
) => {
  const {key} = useRoute();

  return useCurrentDataSelector(selector, {
    reducerId: key,
    reduxStateBranchName: 'search',
  });
};
