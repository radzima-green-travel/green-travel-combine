import {COLORS} from 'assets';
import {useThemeStyles} from 'core/hooks';
import React, {useState, useCallback, memo, useEffect} from 'react';

import {View, TextInput, TouchableOpacity} from 'react-native';
import {Icon} from '../Icon';

import {themeStyles, crossHitClop} from './styles';

interface Props {
  onChange?: Function;
  value?: string;
}

export const HeaderSearchbar = memo(({onChange, value = ''}: Props) => {
  const styles = useThemeStyles(themeStyles);
  const [_value, setValue] = useState(value);

  const clear = useCallback(() => {
    setValue('');
  }, []);

  const onChangeText = useCallback(
    (text) => {
      setValue(text);
      onChange && onChange(text);
    },
    [onChange],
  );

  return (
    <View style={styles.searchContainer}>
      <TextInput
        autoFocus
        value={_value}
        selectionColor={COLORS.logCabin}
        onChangeText={onChangeText}
        style={styles.input}
      />
      {!!_value ? (
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
