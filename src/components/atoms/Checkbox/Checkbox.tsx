import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {StyleProp, ViewStyle, TouchableOpacity} from 'react-native';

import {CHECKBOX_THEMES} from './constants';
import {styles} from './styles';
import {composeTestID} from 'core/helpers';
import {TestIDs} from 'core/types';
import {getPlatformsTestID} from 'core/helpers';
import {Icon} from '../Icon';

export type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
  testID: string;
};

export const Checkbox = memo(({onPress, style, testID, selected}: Props) => {
  const buttonThemeStyles = useThemeStyles(CHECKBOX_THEMES.default);

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.container,
        buttonThemeStyles.container,
        selected && buttonThemeStyles.selected,
        style,
      ]}
      {...getPlatformsTestID(testID)}
      accessibilityState={{selected}}>
      {selected ? (
        <Icon
          {...(buttonThemeStyles.icon as {color: string})}
          name="check"
          testID={composeTestID(testID, TestIDs.Icon)}
        />
      ) : null}
    </TouchableOpacity>
  );
});
