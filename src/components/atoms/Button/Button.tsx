import {useThemeStyles} from 'core/hooks';
import React, {memo, PropsWithChildren} from 'react';
import {
  Text,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  View,
  TouchableOpacity,
  TextStyle,
} from 'react-native';

import {BUTTON_THEMES} from './constants';
import {styles} from './styles';
import {ButtonThemes} from './types';
import {getPlatformsTestID} from 'core/helpers';

type Props = PropsWithChildren<{
  text?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  theme?: ButtonThemes;
  loading?: boolean;
  disabled?: boolean;
  icon?: (textStyle: StyleProp<TextStyle>) => React.ReactElement;
  testID?: string;
  iconPostion?: 'left' | 'center';
  isIconOnlyButton?: boolean;
}>;

export const Button = memo(
  ({
    onPress,
    text,
    icon,
    loading = false,
    disabled = false,
    style,
    textStyle,
    testID,
    theme = 'primary',
    iconPostion = 'center',
    isIconOnlyButton,
  }: Props) => {
    const buttonThemeStyles = useThemeStyles(BUTTON_THEMES[theme]);

    const textThemeStyles = [
      buttonThemeStyles.text,
      disabled && buttonThemeStyles.disabledText,
    ];

    const finalTextStyle = [styles.text, textThemeStyles, textStyle];

    const renderContent = () => {
      if (loading) {
        return (
          <ActivityIndicator
            size="small"
            color={(buttonThemeStyles.text as TextStyle)?.color}
          />
        );
      }

      return (
        <View style={styles.contentContainer}>
          {icon ? (
            <View
              style={[
                !isIconOnlyButton && styles.iconContainer,
                iconPostion === 'left' && styles.leftIconContainer,
              ]}>
              {icon(textThemeStyles)}
            </View>
          ) : null}
          {text && !isIconOnlyButton ? (
            <Text style={finalTextStyle}>{text}</Text>
          ) : null}
        </View>
      );
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.9}
        disabled={disabled || loading}
        style={[
          styles.container,
          buttonThemeStyles.container,
          disabled && buttonThemeStyles.disabled,
          style,
          isIconOnlyButton && styles.iconButton,
        ]}
        {...getPlatformsTestID(testID)}>
        {renderContent()}
      </TouchableOpacity>
    );
  },
);
