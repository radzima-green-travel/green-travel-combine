import { useCurrentActions } from 'react-redux-help-kit';
import * as actions from 'core/actions/search';
import { useRoute } from '@react-navigation/native';

export const useSearchActions = () => {
  const { key } = useRoute();

  return useCurrentActions(actions, {
    reducerId: key,
    reduxStateBranchName: 'search',
  });
};
