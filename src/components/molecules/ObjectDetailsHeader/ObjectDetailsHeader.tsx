import { Header } from 'containers';
import { composeTestID } from 'core/helpers';
import { useThemeStyles } from 'core/hooks';
import React, { memo } from 'react';
import { View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { isIOS } from 'services/PlatformService';
import { themeStyles } from './styles';

interface IProps {
  objectName: string;
  scrollOffset: SharedValue<number>;
  contentRevealThreshold: number;
  testID: string;
  onSharePress: () => void;
  onBookmarkPress: () => void;
  isFavorite: boolean;
}

export const ObjectDetailsHeader = memo(
  ({
    objectName,
    scrollOffset,
    contentRevealThreshold,
    testID,
    onSharePress,
    onBookmarkPress,
    isFavorite,
  }: IProps) => {
    const styles = useThemeStyles(themeStyles);

    const contentRevealed = useDerivedValue(
      () => scrollOffset.value >= contentRevealThreshold,
    );

    const headerRevealingContentStyle = useAnimatedStyle(() => ({
      opacity: withTiming(contentRevealed.value ? 1 : 0, {
        duration: 150,
      }),
    }));

    return (
      <View style={styles.header}>
        <Animated.View
          style={[styles.headerBackdrop, headerRevealingContentStyle]}
        />
        <Header
          overlaysContent={false}
          style={styles.headerContent}
          testID={testID}
          titleAlign="center"
          titleSlot={
            <Animated.View style={headerRevealingContentStyle}>
              <Header.Title
                testID={composeTestID(testID, 'title')}
                size="small">
                {objectName}
              </Header.Title>
            </Animated.View>
          }
          // TODO: Update header action button to support small and large sizes
          rightSlot={
            <>
              <Animated.View style={headerRevealingContentStyle}>
                <Header.BackButton
                  icon={isFavorite ? 'bookmarkFilled' : 'bookmark'}
                  onPress={onBookmarkPress}
                  testID={composeTestID(testID, 'bookmarkButton')}
                />
              </Animated.View>
              <Header.BackButton
                icon={isIOS ? 'shareIos' : 'shareAndroid'}
                onPress={onSharePress}
                testID={composeTestID(testID, 'shareButton')}
              />
            </>
          }
        />
      </View>
    );
  },
);
