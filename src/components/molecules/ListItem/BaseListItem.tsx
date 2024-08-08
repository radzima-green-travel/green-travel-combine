import React, {memo} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useThemeStyles} from 'core/hooks';
import {TrancateDetectionText} from 'atoms';
import {ListItemWrapper} from './ListItemWrapper';
import {themeStyles} from './styles';
import {BaseListItemProps} from './types';

export const BaseListItem = memo(
  ({
    testID,
    title,
    onPress,
    subtitle,

    disabled,
    containerStyle,
    contentStylingType = 'primary',
    onSubtitlePress,
    position = 'single',
    titleNumberOfLines = 1,
    subTitleNumberOfLines = 1,
    titleContainerStyle,
    boldTitle = true,
    onTitleTruncate,
    onSubtitleTruncate,
    rightElement,
    leftElement,
  }: BaseListItemProps) => {
    const styles = useThemeStyles(themeStyles);

    const renderSubtitle = () => {
      if (subtitle) {
        const TextComponent = onSubtitleTruncate ? TrancateDetectionText : Text;

        return (
          <>
            <View style={styles.subtitleOffset} />
            <TextComponent
              style={styles.subtitle}
              numberOfLines={subTitleNumberOfLines}
              ellipsizeMode="tail"
              onTruncate={onSubtitleTruncate}>
              {subtitle}
            </TextComponent>
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

    const renderRightElement = () => {
      return rightElement;
    };

    const renderLeftElement = () => {
      return leftElement;
    };

    return (
      <ListItemWrapper
        testID={testID}
        onPress={onPress}
        disabled={disabled}
        containerStyle={containerStyle}
        position={position}>
        <View style={styles.contentContainer}>
          {renderLeftElement()}

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
          {renderRightElement()}
        </View>
      </ListItemWrapper>
    );
  },
);
