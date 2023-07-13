import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {getDefaultHeaderHeight} from '@react-navigation/elements';
import {SCREEN_HEIGHT, SCREEN_WIDTH, isIOS} from 'services/PlatformService';
import {themeStyles} from './styles';
import {useColorScheme, useThemeStyles} from 'core/hooks';

import {BlurView} from '@react-native-community/blur';
import {AnimatedHeaderBookmarkButton, AnimatedCircleButton} from 'molecules';
import React, {useCallback} from 'react';
import {Animated, View, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from 'assets';
import {useDetailsPageHeaderAnalytics} from 'core/hooks';
import {useNavigation} from '@react-navigation/core';
import {TestIDs} from 'core/types';

const HeaderLeftButton = ({
  opacity,
  objectId,
}: {
  opacity: Animated.AnimatedInterpolation;
  objectId: string;
}) => {
  const {sendSaveObjectDeatailsEvent, sendUnsaveObjectDeatailsEvent} =
    useDetailsPageHeaderAnalytics(objectId);

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

interface IProps {
  buttonsOpacity: Animated.AnimatedInterpolation;
  opacity: Animated.AnimatedInterpolation;
  objecId: string;
  onSharePress: () => void;
}

export const ObjectDetailsHeader = ({
  opacity,
  buttonsOpacity,
  objecId,
  onSharePress,
}: IProps) => {
  const navigation = useNavigation();
  const styles = useThemeStyles(themeStyles);
  const theme = useColorScheme();
  const {top} = useSafeAreaInsets();
  const height = getDefaultHeaderHeight(
    {
      height: SCREEN_HEIGHT,
      width: SCREEN_WIDTH,
    },
    false,
    top,
  );

  return (
    <View pointerEvents="box-none" style={[styles.container, {height}]}>
      <Animated.View
        pointerEvents="none"
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
      <View style={styles.content} pointerEvents="box-none">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}>
          <AnimatedCircleButton
            iconName="chevron"
            testID={TestIDs.HeaderBackButton}
            opacity={buttonsOpacity}
          />
        </TouchableOpacity>
        <View style={styles.rightButtonsContainer}>
          <TouchableOpacity
            style={styles.shareButtonContainer}
            activeOpacity={0.8}
            onPress={onSharePress}>
            <AnimatedCircleButton
              opacity={buttonsOpacity}
              iconName="share"
              testID={TestIDs.HeaderShareButton}
            />
          </TouchableOpacity>

          <HeaderLeftButton opacity={buttonsOpacity} objectId={objecId} />
        </View>
      </View>
    </View>
  );
};
