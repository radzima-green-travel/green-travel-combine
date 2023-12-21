import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  addVisitedObjectRequest,
  deleteVisitedObjectRequest,
} from 'core/reducers';
import {selectUserAuthorized, selectVisitedObjectsIds} from 'core/selectors';
import {some, isEqual} from 'lodash';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {AuthNavigatorParamsList, MainNavigatorParamsList} from 'core/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {Alert} from 'react-native';
import {useMarkAsVisitedButtonAnimation} from './useMarkAsVisitedButtonAnimation';

export type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<AuthNavigatorParamsList>,
  StackNavigationProp<MainNavigatorParamsList>
>;

export const useVisitedObject = ({objectId}: {objectId: string}) => {
  const {t} = useTranslation('objectDetails');
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const visitedObjectsIds = useSelector(selectVisitedObjectsIds);
  const isAuthorized = useSelector(selectUserAuthorized);

  const {
    animatedValue,
    animationRef,
    onButtonLabelLayout,
    onAddVisitedObjectSuccess,
    iconContainerAnimatedStyle,
    labelAnimatedStyle,
  } = useMarkAsVisitedButtonAnimation();

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
    animatedValue.value = 0;
    dispatch(addVisitedObjectRequest(visitedObject));
  }, [dispatch, visitedObject]);

  const deleteVisitedObject = useCallback(() => {
    Alert.alert(t('deleteVisitedObjectAlert'), t('deletedVisitedObject'), [
      {
        text: t('delete'),
        onPress: () => dispatch(deleteVisitedObjectRequest({objectId})),
      },
      {text: t('cancel'), style: 'cancel'},
    ]);
  }, [t, dispatch]);

  const markAsVisited = useCallback(() => {
    if (isAuthorized) {
      isVisited ? deleteVisitedObject() : addVisitedObject();
    } else {
      navigation.navigate('AuthNavigator', {
        screen: 'AuthMethodSelection',
        onSuccessSignIn: addVisitedObject,
      });
    }
  }, [isAuthorized, isVisited]);

  const {loading: addVisitedObjectLoading} = useRequestLoading(
    addVisitedObjectRequest,
  );

  const {loading: deleteVisitedObjectLoading} = useRequestLoading(
    deleteVisitedObjectRequest,
  );

  useOnRequestSuccess(addVisitedObjectRequest, onAddVisitedObjectSuccess);

  return {
    isAuthorized,
    isVisited,
    markAsVisited,
    visitedObjectLoading: addVisitedObjectLoading || deleteVisitedObjectLoading,
    animationRef,
    onButtonLabelLayout,
    iconContainerAnimatedStyle,
    labelAnimatedStyle,
  };
};
