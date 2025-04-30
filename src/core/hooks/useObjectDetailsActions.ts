import {useCurrentActions} from 'react-redux-help-kit';
import * as actions from '../../core/actions/objectDetails';
import {useLocalSearchParams} from 'expo-router';

export const useObjectDetailsActions = () => {
  const {objectId} = useLocalSearchParams<'/object/[objectId]'>();

  return useCurrentActions(actions, {
    reducerId: objectId,
    reduxStateBranchName: 'objectDetails',
  });
};
