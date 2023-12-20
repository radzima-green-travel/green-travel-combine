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
import LottieView from 'lottie-react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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
  const animationRef = useRef<LottieView>(null);
  const animatedValue = useSharedValue(1);

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

  const onAddVisitedObjectSuccess = useCallback(() => {
    animatedValue.value = withTiming(1, {
      duration: 300,
    });

    animationRef.current?.play();
  }, [animatedValue]);

  const iconAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(animatedValue.value, [0, 1], [50, 0]),
        },
      ],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: animatedValue.value,
    };
  });

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
    iconAnimatedStyle,
    textAnimatedStyle,
  };
};
