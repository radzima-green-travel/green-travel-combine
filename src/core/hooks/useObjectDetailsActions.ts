import { useCurrentActions } from 'react-redux-help-kit';
import * as actions from '../../core/actions/objectDetails';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeNavigatorParamsList } from 'core/types';

type ObjectDetailsScreenRouteProps = RouteProp<
  HomeNavigatorParamsList,
  'ObjectDetails'
>;

export const useObjectDetailsActions = () => {
  const {
    params: { objectId },
  } = useRoute<ObjectDetailsScreenRouteProps>();

  return useCurrentActions(actions, {
    reducerId: objectId,
    reduxStateBranchName: 'objectDetails',
  });
};
