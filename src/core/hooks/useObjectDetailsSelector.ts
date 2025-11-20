import { useCurrentDataSelector } from 'react-redux-help-kit';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeNavigatorParamsList } from 'core/types';

type ObjectDetailsScreenRouteProps = RouteProp<
  HomeNavigatorParamsList,
  'ObjectDetails'
>;

export const useObjectDetailsSelector = <
  T extends (state: any, id: string) => any,
>(
  selector: T,
) => {
  const {
    params: { objectId },
  } = useRoute<ObjectDetailsScreenRouteProps>();

  return useCurrentDataSelector(selector, {
    reducerId: objectId,
    reduxStateBranchName: 'objectDetails',
  });
};
