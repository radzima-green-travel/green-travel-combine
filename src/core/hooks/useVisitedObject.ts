import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {addVisitedObjectRequest} from 'core/reducers';
import {selectUserAuthorized, selectVisitedObjectsIds} from 'core/selectors';
import {useSnackbar} from 'atoms';
import {some, isEqual} from 'lodash';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {AuthNavigatorParamsList, MainNavigatorParamsList} from 'core/types';
import {StackNavigationProp} from '@react-navigation/stack';

export type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<AuthNavigatorParamsList>,
  StackNavigationProp<MainNavigatorParamsList>
>;

export const useVisitedObject = ({objectId}: {objectId: string}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const visitedObjectsIds = useSelector(selectVisitedObjectsIds);
  const isAuthorized = useSelector(selectUserAuthorized);
  const {t} = useTranslation('objectDetails');

  const {show: showVisitedObjectSnackbar, ...snackBarPropsVisitedObject} =
    useSnackbar();

  const isVisited = useMemo(
    () => some(visitedObjectsIds, id => isEqual(id, objectId)),
    [visitedObjectsIds, objectId],
  );

  const visitedObject = useMemo(
    () => ({
      objectId,
      data: {timestamp: Date.now()},
    }),
    [objectId],
  );

  const addVisitedObject = useCallback(() => {
    dispatch(addVisitedObjectRequest(visitedObject));
  }, [dispatch, visitedObject]);

  const markAsVisited = useCallback(() => {
    if (isAuthorized) {
      addVisitedObject();
    } else {
      navigation.navigate('AuthNavigator', {
        screen: 'AuthMethodSelection',
        onSuccessSignIn: addVisitedObject,
      });
    }
  }, [isAuthorized]);

  const {loading: addVisitedObjectLoading} = useRequestLoading(
    addVisitedObjectRequest,
  );

  useOnRequestSuccess(addVisitedObjectRequest, () =>
    showVisitedObjectSnackbar({
      type: 'success',
      title: t('markedAsVisited'),
      timeoutMs: 1000,
    }),
  );

  return {
    isAuthorized,
    isVisited,
    markAsVisited,
    visitedObjectLoading: addVisitedObjectLoading,
    snackBarPropsVisitedObject,
  };
};
