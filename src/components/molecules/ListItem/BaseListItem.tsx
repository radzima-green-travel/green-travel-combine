import React, {memo, useMemo} from 'react';
import {Text, TextProps, TouchableOpacity, View} from 'react-native';
import {useThemeStyles} from 'core/hooks';
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
    rightElement,
    leftElement,
    renderTitle,
    renderSubtitle,
  }: BaseListItemProps) => {
    const styles = useThemeStyles(themeStyles);

    const renderSubtitleSection = () => {
      if (subtitle) {
        const textProps: TextProps = {
          style: styles.subtitle,
          numberOfLines: subTitleNumberOfLines,
          ellipsizeMode: 'tail',

          children: subtitle,
        };
        let subtitleNode: React.JSX.Element | null = null;

        if (renderSubtitle) {
          subtitleNode = renderSubtitle(textProps);
        } else {
          subtitleNode = <Text {...textProps} />;
        }

        return (
          <>
            <View style={styles.subtitleOffset} />
            {subtitleNode}
          </>
        );
      }

      return null;
    };

    const textProps: TextProps = useMemo(
      () => ({
        style: [
          styles.title,
          (contentStylingType === 'secondary' || !boldTitle) &&
            styles.titleSecondary,
          onSubtitlePress && styles.titleLink,
        ],
        numberOfLines: titleNumberOfLines,
        ellipsizeMode: 'tail',
        children: title,
      }),
      [
        styles.title,
        styles.titleSecondary,
        styles.titleLink,
        contentStylingType,
        boldTitle,
        onSubtitlePress,
        titleNumberOfLines,
        title,
      ],
    );

    const renderTitleSection = () => {
      let titleNode: React.JSX.Element | null = null;
      if (renderTitle) {
        titleNode = renderTitle(textProps);
      } else {
        titleNode = <Text {...textProps} />;
      }

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
              {renderTitleSection()}
              {renderSubtitleSection()}
            </View>
          </View>
          {renderRightElement()}
        </View>
      </ListItemWrapper>
    );
  },
);
