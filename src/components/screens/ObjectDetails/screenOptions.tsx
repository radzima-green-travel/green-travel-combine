import {BlurView} from '@react-native-community/blur';
import {
  AnimatedBackCircleButton,
  AnimatedHeaderBookmarkButton,
} from 'molecules';
import React, {useCallback} from 'react';
import {StyleSheet, Animated, View} from 'react-native';
import {ScreenOptions} from './types';
import {IMAGE_HEIGHT, styles} from './styles';
import {isIOS} from 'services/PlatformService';
import {COLORS} from 'assets';
import {useDetailsPageHeaderAnalytics, useObject} from 'core/hooks';

const HeaderLeftButton = ({
  opacity,
  objectId,
}: {
  opacity: Animated.AnimatedInterpolation;
  objectId: string;
}) => {
  const data = useObject(objectId)!;

  const {
    sendSaveObjectDeatailsEvent,
    sendUnsaveObjectDeatailsEvent,
  } = useDetailsPageHeaderAnalytics({
    name: data.name,
    category: data.category.name,
  });

  const sendIsFavoriteChangedEvent = useCallback(
    (nextIsFavoriteStatus: boolean) => {
      if (nextIsFavoriteStatus) {
        sendSaveObjectDeatailsEvent();
      } else {
        sendUnsaveObjectDeatailsEvent();
      }
    },
    [sendSaveObjectDeatailsEvent, sendUnsaveObjectDeatailsEvent],
  );

  return (
    <AnimatedHeaderBookmarkButton
      onFavoriteToggle={sendIsFavoriteChangedEvent}
      opacity={opacity}
      objectId={objectId}
    />
  );
};

export const screenOptions: ScreenOptions = theme => ({route}) => {
  const animatedValue = route.params.animatedValue || new Animated.Value(0);
  const opacity = animatedValue.interpolate({
    inputRange: [0, IMAGE_HEIGHT - 80, IMAGE_HEIGHT],
    outputRange: [0, 0, 1],
  });

  const buttonsOpacity = animatedValue.interpolate({
    inputRange: [0, IMAGE_HEIGHT - 80, IMAGE_HEIGHT],
    outputRange: [1, 1, 0],
  });

  return {
    headerTitle: () => null,
    headerTransparent: true,
    headerBackImage: () => (
      <AnimatedBackCircleButton opacity={buttonsOpacity} />
    ),

    headerRight: () => (
      <HeaderLeftButton
        opacity={buttonsOpacity}
        objectId={route.params.objectId}
      />
    ),
    headerBackground: () => (
      <Animated.View
        pointerEvents="box-none"
        style={[
          StyleSheet.absoluteFill,
          {
            opacity: opacity,
          },
        ]}>
        {isIOS ? (
          <BlurView
            blurType={
              theme === 'light' ? 'chromeMaterialLight' : 'chromeMaterialDark'
            }
            style={StyleSheet.absoluteFill}
          />
        ) : (
          <View
            style={[
              styles.andoridHeaderBG,
              {
                backgroundColor:
                  theme === 'light' ? COLORS.white : COLORS.background,
              },
            ]}
          />
        )}
      </Animated.View>
    ),
  };
};
