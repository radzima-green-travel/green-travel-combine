import React, {useState, useCallback, useRef} from 'react';

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  LayoutAnimation,
} from 'react-native';
import {Icon} from '../Icon';

import {styles, crossHitClop, hitSlop} from './styles';

interface Props {
  onChange?: Function;
  value?: string;
}

function Searchbar({onChange, value = ''}: Props) {
  const inputRef = useRef<TextInput>(null);
  const [focused, setFocused] = useState(false);
  const [_value, setValue] = useState(value);

  const onFocus = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFocused(true);
  }, []);

  const onBlur = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFocused(false);
  }, []);

  const clear = useCallback(() => {
    inputRef.current?.clear();
    setValue('');
  }, []);

  const cancel = useCallback(() => {
    clear();
    inputRef.current?.blur();
  }, [clear]);

  const onChangeText = useCallback(
    (text) => {
      setValue(text);
      onChange && onChange(text);
    },
    [onChange],
  );

  return (
    <View style={styles.searchContainer}>
      <View style={styles.container}>
        <Icon
          name="search"
          color="rgba(60, 60, 67, 0.6)"
          width={16}
          height={16}
        />
        <View style={styles.inputContainer}>
          <TextInput
            value={_value}
            ref={inputRef}
            onFocus={onFocus}
            onBlur={onBlur}
            onChangeText={onChangeText}
            placeholder="Search"
            style={styles.input}
          />
        </View>
        {!!value && (
          <TouchableOpacity
            onPress={clear}
            hitSlop={crossHitClop}
            style={[styles.clearButton]}>
            <Icon name="cross" color="white" width="14" height="17" />
          </TouchableOpacity>
        )}
      </View>
      {focused && (
        <TouchableOpacity onPress={cancel} hitSlop={hitSlop}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default React.memo(Searchbar);
