import { Header } from 'containers';
import { useThemeStyles } from 'core/hooks';
import React, { memo } from 'react';
import { View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { themeStyles } from './styles';

interface IProps {
  objectName: string;
  scrollOffset: SharedValue<number>;
  contentRevealThreshold: number;
  testID: string;
}

export const ObjectDetailsHeader = memo(
  ({ objectName, scrollOffset, contentRevealThreshold, testID }: IProps) => {
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
              <Header.Title size="small">{objectName}</Header.Title>
            </Animated.View>
          }
        />
      </View>
    );
  },
);
