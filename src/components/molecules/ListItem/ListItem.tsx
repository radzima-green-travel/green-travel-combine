import React, {memo} from 'react';
import {BaseListItem} from './BaseListItem';
import {ListItemProps} from './types';
import {TouchableOpacity, View, Text} from 'react-native';
import {Icon} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {composeTestID} from 'core/helpers';

export const ListItem = memo<ListItemProps>(
  ({
    label,
    tailIcon,
    tailIconStyle,
    onRightLabelPress,
    testID,
    labelStyle,
    leadIcon,
    leadIconStyle,
    ...props
  }) => {
    const styles = useThemeStyles(themeStyles);

    const renderRightLabel = () => {
      const rightLabelNode = (
        <View style={styles.rightContainer}>
          {label ? (
            <Text style={[styles.label, labelStyle]}>{label}</Text>
          ) : null}
          {tailIcon ? (
            <Icon
              name={tailIcon}
              size={24}
              style={[styles.tailIcon, tailIconStyle]}
              testID={composeTestID(testID, 'tailIcon')}
            />
          ) : null}
        </View>
      );

      if (onRightLabelPress) {
        return (
          <TouchableOpacity activeOpacity={0.9} onPress={onRightLabelPress}>
            {rightLabelNode}
          </TouchableOpacity>
        );
      }

      return rightLabelNode;
    };

    const rennderLeftIcon = () => {
      return leadIcon ? (
        <View style={styles.leadIconContainer}>
          <Icon
            name={leadIcon}
            size={24}
            style={[styles.leadIcon, leadIconStyle]}
            testID={composeTestID(testID, 'leadIcon')}
          />
        </View>
      ) : null;
    };
    return (
      <BaseListItem
        testID={testID}
        rightElement={renderRightLabel()}
        leftElement={rennderLeftIcon()}
        {...props}
      />
    );
  },
);
