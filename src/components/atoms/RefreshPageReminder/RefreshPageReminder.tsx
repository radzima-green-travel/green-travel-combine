import React, {memo, useLayoutEffect, useMemo} from 'react';
import {View, Animated, Text, TouchableOpacity} from 'react-native';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {themeStyles} from './styles';

type Props = {
  onPress: () => void;
};

const scaleYInterpolation = {
  inputRange: [0, 0.5, 1],
  outputRange: [0, 1.5, 1],
};

const scaleXInterpolation = {
  inputRange: [0, 0.5, 1],
  outputRange: [0, 1.2, 1],
};

const opacityInterpolation = {
  inputRange: [0, 0.5, 0.7, 1],
  outputRange: [0, 0, 0, 1],
};

export const RefreshPageReminder = memo<Props>(({onPress}: Props) => {
  const {t} = useTranslation('home');
  const styles = useThemeStyles(themeStyles);
  const animatedValue = useMemo(() => new Animated.Value(0), []);

  useLayoutEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  const hide = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start(() => {
      onPress();
    });
  };

  return (
    <View pointerEvents="box-none" style={styles.container}>
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.reminder,
          {
            transform: [
              {
                scaleY: animatedValue.interpolate(scaleYInterpolation),
              },
              {
                scaleX: animatedValue.interpolate(scaleXInterpolation),
              },
            ],
          },
        ]}>
        <Text style={styles.reminderWidthPusher}>{t('updatesAvailable')}</Text>
      </Animated.View>

      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.textContainer,
          {
            opacity: animatedValue.interpolate(opacityInterpolation),
          },
        ]}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            hide();
          }}
          activeOpacity={1}>
          <Text style={styles.text}>{t('updatesAvailable')}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
});
