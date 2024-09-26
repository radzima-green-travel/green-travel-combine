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
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface Props {
  onChange: Function;
  autoFocus?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  selectionColor?: string;
  value: string;
  testID: string;
}

export const HeaderSearchbar = memo(
  ({
    onChange,
    autoFocus = true,
    containerStyle,
    inputStyle,
    selectionColor,
    value,
    testID,
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

    const isLightTheme = colorTheme === 'light';

    return (
      <View style={[styles.searchContainer, containerStyle]}>
        <TextInput
          autoFocus={autoFocus}
          value={value}
          selectionColor={
            selectionColor ||
            (isLightTheme
              ? COLORS.light.icon.accentLight
              : COLORS.dark.icon.accentLight)
          }
          onChangeText={onChangeText}
          style={[styles.input, inputStyle]}
          {...getPlatformsTestID(composeTestID(testID, 'input'))}
        />
        {value ? (
          <TouchableOpacity
            {...getPlatformsTestID(composeTestID(testID, 'clearButton'))}
            onPress={clear}
            hitSlop={crossHitClop}
            style={styles.icon}>
            <Icon
              testID={composeTestID(testID, 'crossIcon')}
              style={styles.icon}
              name="cross"
              size={24}
            />
          </TouchableOpacity>
        ) : (
          <Icon
            style={styles.icon}
            name={'search'}
            width={24}
            height={24}
            testID={composeTestID(testID, 'searchIcon')}
          />
        )}
      </View>
    );
  },
);
