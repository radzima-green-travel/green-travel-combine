import {useCurrentActions} from 'react-redux-help-kit';
import * as actions from '../../core/actions/objectDetails';
import {useRoute} from '@react-navigation/native';

export const useObjectDetailsActions = () => {
  const {key} = useRoute();

  return useCurrentActions(actions, {
    reducerId: key,
    reduxStateBranchName: 'objectDetails',
  });
};
