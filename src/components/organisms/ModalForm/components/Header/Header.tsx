import { composeTestID } from 'core/helpers';
import { useThemeStyles } from 'core/hooks';
import { AnimatedCircleButton } from 'molecules';
import React, { ReactNode } from 'react';
import { Platform, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { themeStyles, containerGap } from './styles';

export const Header = ({
  title,
  onBackPress,
  testID,
}: {
  title: ReactNode;
  onBackPress?: () => void;
  testID: string;
}) => {
  const styles = useThemeStyles(themeStyles);

  const { top: topSafeAreaInset } = useSafeAreaInsets();

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        Platform.select({
          ios: { marginTop: containerGap },
          android: { marginTop: Math.max(topSafeAreaInset, containerGap * 2) },
        }),
      ]}>
      <AnimatedCircleButton
        icon={{ name: 'chevronMediumLeft' }}
        testID={composeTestID(testID, 'backButton')}
        onPress={onBackPress}
      />
      <Text testID={composeTestID(testID, 'title')} style={styles.title}>
        {title}
      </Text>
    </View>
  );
};
