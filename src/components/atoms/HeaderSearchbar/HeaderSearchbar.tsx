import {COLORS} from 'assets';
import {useThemeStyles, useColorScheme} from 'core/hooks';
import React, {useCallback, memo} from 'react';

import {
  View,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {Icon} from '../Icon';

import {themeStyles, crossHitClop} from './styles';

interface Props {
  onChange: Function;
  autoFocus?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  selectionColor?: string;
  value: string;
}

export const HeaderSearchbar = memo(
  ({
    onChange,
    autoFocus = true,
    containerStyle,
    inputStyle,
    selectionColor,
    value,
  }: Props) => {
    const styles = useThemeStyles(themeStyles);
    const colorTheme = useColorScheme();

    const clear = useCallback(() => {
      onChange('');
    }, [onChange]);

    const onChangeText = useCallback(
      text => {
        onChange(text);
      },
      [onChange],
    );

    return (
      <View style={[styles.searchContainer, containerStyle]}>
        <TextInput
          autoFocus={autoFocus}
          value={value}
          selectionColor={
            selectionColor ||
            (colorTheme === 'light' ? COLORS.logCabin : COLORS.white)
          }
          onChangeText={onChangeText}
          style={[styles.input, inputStyle]}
        />
        {value ? (
          <TouchableOpacity
            onPress={clear}
            hitSlop={crossHitClop}
            style={styles.icon}>
            <Icon style={styles.icon} name="cross" size={24} />
          </TouchableOpacity>
        ) : (
          <Icon
            style={styles.icon}
            name="search"
            color={COLORS.logCabin}
            size={24}
          />
        )}
      </View>
    );
  },
);
