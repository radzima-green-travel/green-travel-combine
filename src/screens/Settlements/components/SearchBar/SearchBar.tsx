import {useThemeStyles, useColorScheme, useTranslation} from 'core/hooks';
import React, {useCallback, memo} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {themeStyles} from './styles';
import {TestIDs} from 'core/types';
import {Icon} from 'components/atoms';
import {composeTestID} from 'core/helpers';

interface Props {
  onChange: (text: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  selectionColor?: string;
  value: string;
}

export const SearchBar = memo(
  ({onChange, containerStyle, inputStyle, selectionColor, value}: Props) => {
    const styles = useThemeStyles(themeStyles);
    const colorTheme = useColorScheme();
    const {t} = useTranslation('filters');

    const onClear = useCallback(() => {
      onChange('');
    }, [onChange]);

    const onOpenSettings = useCallback(() => {}, []);

    const onChangeText = useCallback(
      text => {
        onChange(text);
      },
      [onChange],
    );

    return (
      <View style={[styles.searchContainer, containerStyle]}>
        <Icon
          style={[styles.icon, styles.leftIcon]}
          name={'search'}
          width={24}
          height={24}
          testID={composeTestID(TestIDs.SearchBar, 'searchIcon')}
        />
        <TextInput
          autoFocus
          value={value}
          selectionColor={selectionColor || styles.selectionColor[colorTheme]}
          placeholder={t('settlements.search')}
          onChangeText={onChangeText}
          style={[styles.input, inputStyle]}
          testID={composeTestID(TestIDs.SearchBar, 'input')}
        />
        <TouchableOpacity
          onPress={value ? onClear : onOpenSettings}
          style={styles.icon}>
          <Icon
            style={[styles.icon, styles.rightIcon]}
            name={value ? 'close' : 'tuneSimplified'}
            width={24}
            height={24}
            testID={
              value
                ? composeTestID(TestIDs.SearchBar, 'clear')
                : composeTestID(TestIDs.SearchBar, 'settings')
            }
          />
        </TouchableOpacity>
      </View>
    );
  },
);
