import React, {useState, useCallback, useRef} from 'react';

import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {Icon} from '../Icon';

import {styles, crossHitClop, hitSlop} from './styles';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
interface Props {
  onChange?: Function;
  value?: string;
}

function HeaderSearchbar({onChange, value = ''}: Props) {
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
        {!!_value && (
          <TouchableOpacity
            onPress={clear}
            hitSlop={crossHitClop}
            style={styles.clearButton}>
            <Icon name="cross" color="white" width="14" height="17" />
          </TouchableOpacity>
        )}
        <Icon name="search" color="white" width={20} height={20} />
      </View>
      {focused && (
        <TouchableOpacity onPress={cancel} hitSlop={hitSlop}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default React.memo(HeaderSearchbar);
