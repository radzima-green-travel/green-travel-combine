import React, {memo} from 'react';
import {AnimatedCircleButton} from '../AnimatedCircleButton';
import {StyleProp, ViewStyle} from 'react-native';

interface IProps {
  onPress: () => void;
  testID: string;
  containerStyle?: StyleProp<ViewStyle>;
}

export const HeaderBackButton = memo(
  ({onPress, testID, containerStyle}: IProps) => {
    return (
      <AnimatedCircleButton
        icon={{name: 'chevronMediumLeft'}}
        onPress={onPress}
        testID={testID}
        containerStyle={containerStyle}
      />
    );
  },
);
