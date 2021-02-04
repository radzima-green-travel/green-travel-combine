import {COLORS} from 'assets';
import {useThemeStyles} from 'core/hooks';
import React, {useCallback, memo, useState} from 'react';

import {View, TextInput, TouchableOpacity} from 'react-native';
import {Icon} from '../Icon';

import {themeStyles, crossHitClop} from './styles';

interface Props {
  onChange: Function;
}

export const HeaderSearchbar = memo(({onChange}: Props) => {
  const styles = useThemeStyles(themeStyles);
  const [value, setValue] = useState('');

  const clear = useCallback(() => {
    onChange('');
    setValue('');
  }, [onChange]);

  const onChangeText = useCallback(
    (text) => {
      setValue(text);
      onChange(text);
    },
    [onChange],
  );

  return (
    <View style={styles.searchContainer}>
      <TextInput
        autoFocus
        value={value}
        selectionColor={COLORS.logCabin}
        onChangeText={onChangeText}
        style={styles.input}
      />
      {value ? (
        <TouchableOpacity
          onPress={clear}
          hitSlop={crossHitClop}
          style={styles.icon}>
          <Icon name="cross" color={COLORS.logCabin} size={24} />
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
});
