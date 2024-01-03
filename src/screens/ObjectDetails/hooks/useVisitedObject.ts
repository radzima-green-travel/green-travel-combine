import {useCallback, useMemo, useRef} from 'react';
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
import {useBottomMenu} from 'core/hooks';
import {hapticFeedbackService} from 'services/HapticFeedbackService';

export type NavigationProps = CompositeNavigationProp<
  StackNavigationProp<AuthNavigatorParamsList>,
  StackNavigationProp<MainNavigatorParamsList>
>;

export const useVisitedObject = ({objectId}: {objectId: string}) => {
  const {t} = useTranslation('objectDetails');
  const dispatch = useDispatch();
  const startTime = useRef(Date.now());
  const navigation = useNavigation<NavigationProps>();
  const visitedObjectsIds = useSelector(selectVisitedObjectsIds);
  const isAuthorized = useSelector(selectUserAuthorized);

  const {
    animationRef,
    resetAnimation,
    onButtonLabelLayout,
    runSuccessAnimation,
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
    resetAnimation();
    dispatch(addVisitedObjectRequest(visitedObject));
  }, [dispatch, resetAnimation, visitedObject]);

  const deleteVisitedObject = useCallback(() => {
    Alert.alert(t('deleteVisitedObjectAlert'), t('deletedVisitedObject'), [
      {
        text: t('delete'),
        onPress: () => dispatch(deleteVisitedObjectRequest({objectId})),
      },
      {text: t('cancel'), style: 'cancel'},
    ]);
  }, [t, dispatch, objectId]);

  const markAsVisited = useCallback(() => {
    if (isAuthorized) {
      isVisited ? deleteVisitedObject() : addVisitedObject();
    } else {
      navigation.navigate('AuthNavigator', {
        screen: 'AuthMethodSelection',
        onSuccessSignIn: addVisitedObject,
      });
    }
  }, [
    addVisitedObject,
    deleteVisitedObject,
    isAuthorized,
    isVisited,
    navigation,
  ]);

  const {loading: addVisitedObjectLoading} = useRequestLoading(
    addVisitedObjectRequest,
  );

  const {loading: deleteVisitedObjectLoading} = useRequestLoading(
    deleteVisitedObjectRequest,
  );

  useOnRequestSuccess(addVisitedObjectRequest, () => {
    runSuccessAnimation();
    setTimeout(() => {
      hapticFeedbackService.trigger('notificationSuccess');
      openMenu();
    }, 1500);
  });

  const {openMenu, ...bottomMenuProps} = useBottomMenu();

  const addHapticFeedback = useCallback((hours: number, minutes: number) => {
    if (minutes % 30 === 0) {
      hapticFeedbackService.trigger('selection');
      startTime.current = Date.now();
    } else {
      const timeGap = Date.now() - startTime.current;

      if (timeGap > 50) {
        hapticFeedbackService.trigger('selection');
      }
      startTime.current = Date.now();
    }
  }, []);

  return {
    isAuthorized,
    isVisited,
    markAsVisited,
    visitedObjectLoading: addVisitedObjectLoading || deleteVisitedObjectLoading,
    animationRef,
    onButtonLabelLayout,
    iconContainerAnimatedStyle,
    labelAnimatedStyle,
    bottomMenuProps,
    addHapticFeedback,
  };
};