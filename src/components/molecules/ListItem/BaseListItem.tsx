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
    leadIcon,
    subtitle,
  }: BaseListItemProps) => {
    const styles = useThemeStyles(themeStyles);

    return (
      <ListItemWrapper
        testID={testID}
        onPress={onPress}
        disabled={disabled}
        containerStyle={containerStyle}>
        <View style={styles.titleContainer}>
          {leadIcon && (
            <Icon name={leadIcon} size={20} style={styles.leadIcon} />
          )}
          <View>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Text>
            {!!subtitle && (
              <Text
                style={styles.subtitle}
                numberOfLines={1}
                ellipsizeMode="tail">
                {subtitle}
              </Text>
            )}
          </View>
        </View>
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
