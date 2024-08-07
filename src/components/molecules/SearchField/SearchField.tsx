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
import {TestIDs} from 'core/types';
import {Icon} from 'components/atoms';
import {composeTestID} from 'core/helpers';

interface Props {
  onChange: (text: string) => void;
  inputStyle?: StyleProp<TextStyle>;
  value: string;
}

export const SearchField = memo(({onChange, inputStyle, value}: Props) => {
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
        testID={composeTestID(TestIDs.SearchBar, 'searchIcon')}
      />
      <TextInput
        value={value}
        selectionColor={styles.selectionColor[colorTheme]}
        placeholder={t('settlements.search')}
        onChangeText={onChange}
        style={[styles.input, inputStyle]}
        testID={composeTestID(TestIDs.SearchBar, 'input')}
      />
      <TouchableOpacity onPress={onClear} disabled={!value} style={styles.icon}>
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
});
