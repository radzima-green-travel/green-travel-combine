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
    containerStyle,
    leadIcon,
    subtitle,
    contentStylingType = 'primary',
    onSubtitlePress,
    leadIconStyle,
    position = 'single',
    titleNumberOfLines = 1,
    tailIcon,
    tailIconStyle,
    labelStyle,
    boldTitle = true,
  }: BaseListItemProps) => {
    const styles = useThemeStyles(themeStyles);

    const renderSubtitle = () => {
      if (subtitle) {
        return (
          <>
            <View style={styles.subtitleOffset} />
            <Text
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode="tail">
              {subtitle}
            </Text>
          </>
        );
      }

      return null;
    };

    const renderTitle = () => {
      const titleNode = (
        <Text
          style={[
            styles.title,
            (contentStylingType === 'secondary' || !boldTitle) &&
              styles.titleSecondary,
            onSubtitlePress && styles.titleLink,
          ]}
          numberOfLines={titleNumberOfLines}
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
              (position === 'top' || position === 'middle') &&
                styles.titleContainerSeparator,
              (position === 'bottom' || position === 'middle') &&
                styles.titleContainerBottomMiddle,
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
            {label ? (
              <Text style={[styles.label, labelStyle]}>{label}</Text>
            ) : null}
            {tailIcon ? (
              <Icon
                name={tailIcon}
                size={24}
                style={[styles.tailIcon, tailIconStyle]}
              />
            ) : null}
          </View>
        </View>
      </ListItemWrapper>
    );
  },
);
