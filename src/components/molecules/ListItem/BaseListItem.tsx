import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {Icon} from 'atoms';
import {ListItemWrapper} from './ListItemWrapper';
import {themeStyles} from './styles';
import {BaseListItemProps} from './types';

export const BaseListItem = memo(
  ({
    testID,
    title,
    onPress,
    disabled,
    label,
    withNavigationIcon,
    containerStyle,
  }: BaseListItemProps) => {
    const styles = useThemeStyles(themeStyles);

    return (
      <ListItemWrapper
        testID={testID}
        onPress={onPress}
        disabled={disabled}
        containerStyle={containerStyle}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rightContainer}>
          {label ? <Text style={styles.label}>{label}</Text> : null}
          {withNavigationIcon ? (
            <Icon
              name={'chevronMediumRight'}
              size={24}
              style={styles.navigationIcon}
            />
          ) : null}
        </View>
      </ListItemWrapper>
    );
  },
);
