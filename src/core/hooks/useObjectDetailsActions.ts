import {useCurrentActions} from 'react-redux-help-kit';
import * as actions from '../../core/actions/objectDetails';
import {useLocalSearchParams} from 'expo-router';
import {useEffect} from 'react';
import {getAnalyticsNavigationScreenName} from 'core/helpers';

export const useObjectDetailsActions = () => {
  const {objectId} = useLocalSearchParams<'/object/[objectId]'>();

  useEffect(() => {
    getAnalyticsNavigationScreenName();
  }, []);

  return useCurrentActions(actions, {
    reducerId: objectId,
    reduxStateBranchName: 'objectDetails',
  });
};
