import React, {ReactNode} from 'react';
import {View, Platform, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {composeTestID} from 'core/helpers';
import {useThemeStyles} from 'core/hooks';
import {AnimatedCircleButton} from 'molecules';
import {themeStyles, headerGap} from '../../styles';

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

  const {top: topSafeAreaInset} = useSafeAreaInsets();

  return (
    <View
      testID={testID}
      style={[
        styles.header,
        Platform.select({
          ios: {marginTop: headerGap},
          android: {marginTop: Math.max(topSafeAreaInset, headerGap * 2)},
        }),
      ]}>
      <AnimatedCircleButton
        icon={{name: 'chevronMediumLeft'}}
        testID={composeTestID(testID, 'backButton')}
        onPress={onBackPress}
      />
      <Text testID={composeTestID(testID, 'title')} style={styles.title}>
        {title}
      </Text>
    </View>
  );
};
