import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {Icon, TrancateDetectionText} from 'atoms';
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
    onRightLabelPress,
    leadIconStyle,
    position = 'single',
    titleNumberOfLines = 1,
    tailIcon,
    tailIconStyle,
    labelStyle,
    titleContainerStyle,
    boldTitle = true,
    onTitleTruncate,
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
      const TextComponent = onTitleTruncate ? TrancateDetectionText : Text;

      const titleNode = (
        <TextComponent
          style={[
            styles.title,
            (contentStylingType === 'secondary' || !boldTitle) &&
              styles.titleSecondary,
            onSubtitlePress && styles.titleLink,
          ]}
          numberOfLines={titleNumberOfLines}
          ellipsizeMode="tail"
          onTruncate={onTitleTruncate}>
          {title}
        </TextComponent>
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
              titleContainerStyle,
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
          {renderRightLabel()}
        </View>
      </ListItemWrapper>
    );
  },
);
