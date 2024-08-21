import {useThemeStyles, useColorScheme, useTranslation} from 'core/hooks';
import React, {useCallback, memo} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from 'react-native';
import {themeStyles} from './styles';
import {Icon} from 'components/atoms';
import {composeTestID, getPlatformsTestID} from 'core/helpers';

interface Props {
  onChange: (text: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  value: string;
  testID: string;
}

export const SearchField = memo(
  ({onChange, inputStyle, value, testID}: Props) => {
    const styles = useThemeStyles(themeStyles);
    const colorTheme = useColorScheme();
    const {t} = useTranslation('filters');

    const onClear = useCallback(() => {
      onChange('');
    }, [onChange]);

    return (
      <View style={styles.searchContainer}>
        <Icon
          style={[styles.icon, styles.leftIcon]}
          name={'search'}
          width={24}
          height={24}
          testID={composeTestID(testID, 'searchIcon')}
        />
        <TextInput
          value={value}
          selectionColor={styles.selectionColor[colorTheme]}
          placeholder={t('settlements.search')}
          onChangeText={onChange}
          style={[styles.input, inputStyle]}
          {...getPlatformsTestID(composeTestID(testID, 'input'))}
        />
        {value ? (
          <TouchableOpacity
            onPress={onClear}
            activeOpacity={0.9}
            style={styles.icon}>
            <Icon
              style={[styles.icon, styles.rightIcon]}
              name={'close'}
              width={24}
              height={24}
              testID={composeTestID(testID, 'clear')}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  },
);
