import React, {memo} from 'react';
import {BaseListItem} from '../../BaseListItem';
import {ListItemPrimaryProps} from '../../types';
import {TouchableOpacity, View, Text} from 'react-native';
import {Icon} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import {themeStyles} from './styles';
import {composeTestID} from 'core/helpers';

export const ListItemPrimary = memo<ListItemPrimaryProps>(
  ({
    label,
    tailIcon,
    tailIconStyle,
    onRightLabelPress,
    testID,
    labelStyle,
    labelContainerStyle,
    leadIcon,
    leadIconStyle,
    leadIconContainerStyle,
    ...props
  }) => {
    const styles = useThemeStyles(themeStyles);

    const renderRightLabel = () => {
      const rightLabelNode = (
        <View style={styles.rightContainer}>
          {label ? (
            <View style={labelContainerStyle}>
              <Text style={[styles.label, labelStyle]}>{label}</Text>
            </View>
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
        <View style={[styles.leadIconContainer, leadIconContainerStyle]}>
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
