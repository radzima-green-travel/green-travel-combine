import React, {memo} from 'react';
import {AnimatedCircleButton} from '../AnimatedCircleButton';

interface IProps {
  onPress: () => void;
  testID: string;
}

export const HeaderBackButton = memo(({onPress, testID}: IProps) => {
  return (
    <AnimatedCircleButton
      icon={{name: 'chevronMediumLeft'}}
      onPress={onPress}
      testID={testID}
    />
  );
});
