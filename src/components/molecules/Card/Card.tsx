import { useThemeStyles } from 'core/hooks';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Text, View, ImageStyle, StyleProp, ViewStyle } from 'react-native';
import { themeStyles } from './styles';
import { Button, Icon, Link } from 'atoms';
import { composeTestID } from 'core/helpers';
import { IconsNames } from 'atoms/Icon';

interface IProps {
  title: string;
  subtitle?: string;
  leftImageAsset: number;
  rightButtonIcon?: IconsNames;
  onRightButtonPress?: () => void;
  testID: string;
  link?: string;
  containerStyle?: StyleProp<ViewStyle>;
  onLinkPress: (url: string) => void;
}

export const Card = memo(
  ({
    title,
    subtitle,
    onRightButtonPress,
    rightButtonIcon,
    leftImageAsset,
    testID,
    link,
    containerStyle,
    onLinkPress,
  }: IProps) => {
    const styles = useThemeStyles(themeStyles);
    return (
      <View style={[styles.container, containerStyle]} testID={testID}>
        <Image
          testID={composeTestID(testID, 'leftImage')}
          style={styles.leftImage as ImageStyle}
          source={leftImageAsset}
        />
        <View style={styles.contentContainer}>
          <Text
            numberOfLines={2}
            testID={composeTestID(testID, 'title')}
            style={styles.title}>
            {title}
          </Text>
          {subtitle && (
            <Text numberOfLines={1} style={styles.subtitle}>
              {subtitle}
            </Text>
          )}
          {link && (
            <Link
              name={link}
              onPress={onLinkPress}
              testID={composeTestID(testID, 'link')}
              style={styles.link}
              link={link}
              numberOfLines={1}
            />
          )}
        </View>
        {onRightButtonPress && rightButtonIcon && (
          <Button
            onPress={onRightButtonPress}
            testID={composeTestID(testID, 'button')}
            theme="quarterly"
            withBorder={false}
            isIconOnlyButton
            renderIcon={textStyle => (
              <Icon
                testID={composeTestID(testID, 'buttonIcon')}
                name={rightButtonIcon}
                size={24}
                style={textStyle}
              />
            )}
          />
        )}
      </View>
    );
  },
);
