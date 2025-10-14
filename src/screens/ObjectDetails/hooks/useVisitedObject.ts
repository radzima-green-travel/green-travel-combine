import {useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {
  addVisitedObjectRequest,
  deleteVisitedObjectRequest,
  scheduleShareExperienceMenu,
} from 'core/actions';
import {selectUserAuthorized, selectVisitedObjectsIds} from 'core/selectors';
import {some, isEqual} from 'lodash';
import {useOnRequestSuccess, useRequestLoading} from 'react-redux-help-kit';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {AuthNavigatorParamsList, MainNavigatorParamsList} from 'core/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Alert} from 'react-native';
import {useMarkAsVisitedButtonAnimation} from './useMarkAsVisitedButtonAnimation';
import {useObjectDetailsAnalytics} from './useObjectDetailsAnalytics';
import {selectObjectDetails} from 'core/selectors';
import {useObjectDetailsSelector} from 'core/hooks';

export type NavigationProps = CompositeNavigationProp<
  NativeStackNavigationProp<AuthNavigatorParamsList>,
  NativeStackNavigationProp<MainNavigatorParamsList>
>;

export const useVisitedObject = ({objectId}: {objectId: string}) => {
  const {t} = useTranslation('objectDetails');
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProps>();
  const visitedObjectsIds = useSelector(selectVisitedObjectsIds);
  const isAuthorized = useSelector(selectUserAuthorized);
  const data = useObjectDetailsSelector(selectObjectDetails);

  const {
    sendMarkVisitedButtonClickEvent,
    sendUnmarkVisitedButtonClickEvent,
    sendCancelOptionClickEvent,
    sendUnmarkOptionClickEvent,
  } = useObjectDetailsAnalytics();

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
    sendMarkVisitedButtonClickEvent();
    resetAnimation();
    dispatch(addVisitedObjectRequest(visitedObject));
  }, [
    dispatch,
    resetAnimation,
    sendMarkVisitedButtonClickEvent,
    visitedObject,
  ]);

  const deleteVisitedObject = useCallback(() => {
    sendUnmarkVisitedButtonClickEvent();
    Alert.alert(t('deleteVisitedObjectAlert'), t('deletedVisitedObject'), [
      {
        text: t('delete'),
        onPress: () => {
          sendUnmarkOptionClickEvent();
          dispatch(deleteVisitedObjectRequest({objectId}));
        },
      },
      {text: t('cancel'), style: 'cancel', onPress: sendCancelOptionClickEvent},
    ]);
  }, [
    sendUnmarkVisitedButtonClickEvent,
    t,
    sendCancelOptionClickEvent,
    sendUnmarkOptionClickEvent,
    dispatch,
    objectId,
  ]);

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

    if (data) {
      dispatch(
        scheduleShareExperienceMenu({
          delayMs: 1000,
          data: {
            objectId,
            objectName: data.name,
            incompleteFieldsNames: data.category.incompleteFieldsNames,
            analyticsMetadata: {
              name: data.name,
              categoryName: data.category.name,
            },
          },
        }),
      );
    }
  });

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
