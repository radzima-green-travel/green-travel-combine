import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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
    contentStylingType = 'primary',
    onSubtitlePress,
    leadIconStyle,
    position = 'single',
  }: BaseListItemProps) => {
    const styles = useThemeStyles(themeStyles);

    const renderSubtitle = () => {
      if (subtitle) {
        return (
          <Text style={styles.subtitle} numberOfLines={1} ellipsizeMode="tail">
            {subtitle}
          </Text>
        );
      }

      return null;
    };

    const renderTitle = () => {
      const titleNode = (
        <Text
          style={[
            styles.title,
            contentStylingType === 'secondary' && styles.titleSecondary,
            onSubtitlePress && styles.titleLink,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {title}
        </Text>
      );

      if (onSubtitlePress) {
        return (
          <TouchableOpacity activeOpacity={0.9} onPress={onSubtitlePress}>
            {titleNode}
          </TouchableOpacity>
        );
      }

      return titleNode;
    };

    return (
      <ListItemWrapper
        testID={testID}
        onPress={onPress}
        disabled={disabled}
        containerStyle={containerStyle}
        position={position}>
        <View style={styles.contentContainer}>
          {leadIcon && (
            <View style={styles.leadIconContainer}>
              <Icon
                name={leadIcon}
                size={24}
                style={[styles.leadIcon, leadIconStyle]}
              />
            </View>
          )}
          <View
            style={[
              styles.titleContainer,
              contentStylingType === 'secondary' &&
                styles.titleContainerSecondary,
              (position === 'top' || position === 'middle') &&
                styles.titleContainerSeparator,
            ]}>
            <View
              style={
                contentStylingType === 'secondary' &&
                styles.secondaryContentContainer
              }>
              {renderTitle()}
              {renderSubtitle()}
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
        </View>
      </ListItemWrapper>
    );
  },
);
