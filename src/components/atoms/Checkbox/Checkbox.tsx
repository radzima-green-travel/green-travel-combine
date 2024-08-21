import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {StyleProp, ViewStyle, TouchableOpacity} from 'react-native';

import {CHECKBOX_THEMES} from './constants';
import {styles} from './styles';
import {composeTestID} from 'core/helpers';
import {getPlatformsTestID} from 'core/helpers';
import {Icon} from '../Icon';

export type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  checked: boolean;
  testID: string;
};

export const Checkbox = memo(({onPress, style, testID, checked}: Props) => {
  const buttonThemeStyles = useThemeStyles(CHECKBOX_THEMES.default);

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.container,
        buttonThemeStyles.container,
        checked && buttonThemeStyles.checked,
        style,
      ]}
      {...getPlatformsTestID(testID)}
      accessibilityState={{checked}}>
      {checked ? (
        <Icon
          {...(buttonThemeStyles.icon as {color: string})}
          name="check"
          testID={composeTestID(testID, 'checkIcon')}
        />
      ) : null}
    </TouchableOpacity>
  );
});
