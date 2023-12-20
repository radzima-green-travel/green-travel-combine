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
import LottieView from 'lottie-react-native';
import Animated from 'react-native-reanimated';

import {BUTTON_THEMES} from './constants';
import {styles} from './styles';
import {ButtonThemes} from './types';
import {getPlatformsTestID} from 'core/helpers';
import {animations} from 'assets';

type Props = PropsWithChildren<{
  text?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  theme?: ButtonThemes;
  loading?: boolean;
  disabled?: boolean;
  icon?: (textStyle: StyleProp<TextStyle>) => React.ReactElement;
  testID: string;
  iconPostion?: 'left' | 'center';
  isIconOnlyButton?: boolean;
  animationRef?: React.RefObject<LottieView>;
  iconAnimatedStyle?: StyleProp<ViewStyle>;
  textAnimatedStyle?: StyleProp<TextStyle>;
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
    animationRef,
    iconAnimatedStyle,
    textAnimatedStyle,
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
          {animationRef ? (
            <LottieView
              source={animations['Confetti']}
              ref={animationRef}
              style={styles.animationContainer}
              loop={false}
            />
          ) : null}
          {icon ? (
            <Animated.View
              style={[
                !isIconOnlyButton && styles.iconContainer,
                iconPostion === 'left' && styles.leftIconContainer,
                iconAnimatedStyle && iconAnimatedStyle,
              ]}>
              {icon(textThemeStyles)}
            </Animated.View>
          ) : null}
          {text && !isIconOnlyButton ? (
            <Animated.Text
              style={[finalTextStyle, textAnimatedStyle && textAnimatedStyle]}>
              {text}
            </Animated.Text>
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
